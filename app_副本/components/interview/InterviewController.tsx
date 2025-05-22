'use client';

import React from 'react';
import { message } from 'antd';
import InterviewInvitationForm from './InterviewInvitation';
import { interviewService } from '../../services/interview';
import type { InterviewInvitation, TimeSlot, InterviewType } from '../../types/interview';

interface Props {
  invitation: InterviewInvitation;
  onUpdate: (invitation: InterviewInvitation) => void;
}

const InterviewController: React.FC<Props> = ({ invitation, onUpdate }) => {
  const handleSubmit = async (values: { type: InterviewType; timeSlot: TimeSlot }) => {
    try {
      // Create calendar event
      const calendarEvent = await interviewService.createGoogleCalendarEvent(
        invitation,
        values.timeSlot
      );

      // Update invitation with video link if it's a video interview
      const updatedInvitation = {
        ...invitation,
        type: values.type,
        selectedSlot: values.timeSlot,
        status: 'confirmed' as const,
        videoLink: values.type === 'video' ? calendarEvent.conferenceData?.entryPoints[0].uri : undefined,
      };

      // Send notifications
      await Promise.all([
        // Send calendar invitations
        Promise.resolve(calendarEvent),
        // Send DingTalk notifications to interviewers
        interviewService.sendDingTalkNotification(updatedInvitation, values.timeSlot),
        // Send email to candidate
        interviewService.sendInterviewEmail(updatedInvitation, values.timeSlot),
      ]);

      onUpdate(updatedInvitation);
      message.success('Interview scheduled successfully');
    } catch (error) {
      console.error('Failed to schedule interview:', error);
      message.error('Failed to schedule interview. Please try again.');
    }
  };

  const handleResend = async () => {
    try {
      // Create new invitation
      const newInvitation = {
        ...invitation,
        status: 'pending' as const,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      };

      onUpdate(newInvitation);
      message.success('Interview invitation resent successfully');
    } catch (error) {
      console.error('Failed to resend invitation:', error);
      message.error('Failed to resend invitation. Please try again.');
    }
  };

  return (
    <InterviewInvitationForm
      invitation={invitation}
      onSubmit={handleSubmit}
      onResend={handleResend}
    />
  );
};

export default InterviewController; 