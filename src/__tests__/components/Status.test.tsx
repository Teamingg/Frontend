import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Status from '../../components/Status';
import { TeamStatus } from '@/types/team/teamStatus';

describe('Status', () => {
  it('renders RECRUITING status correctly', () => {
    render(<Status status="RECRUITING" />);
    const statusElement = screen.getByText('모집중');
    expect(statusElement).toBeInTheDocument();
    expect(statusElement.parentElement).toHaveClass('bg-green-500');
  });

  it('renders COMPLETE status correctly', () => {
    render(<Status status="COMPLETE" />);
    const statusElement = screen.getByText('모집완료');
    expect(statusElement).toBeInTheDocument();
    expect(statusElement.parentElement).toHaveClass('bg-gray-500');
  });

  it('renders WORKING status correctly', () => {
    render(<Status status="WORKING" />);
    const statusElement = screen.getByText('진행중');
    expect(statusElement).toBeInTheDocument();
    expect(statusElement.parentElement).toHaveClass('bg-primary');
  });

  it('renders empty text for unknown status', () => {
    render(<Status status="RECRUITING" />);
    const statusElement = screen.getByText('모집중');
    expect(statusElement).toBeInTheDocument();
  });
}); 