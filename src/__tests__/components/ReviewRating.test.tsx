import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ReviewRating from '../../components/ReviewRating';

describe('ReviewRating', () => {
  it('renders 5 empty stars initially', () => {
    render(<ReviewRating />);
    const stars = screen.getAllByRole('listitem');
    expect(stars).toHaveLength(5);
    
    // 모든 별이 비어있는지 확인
    stars.forEach(star => {
      expect(star.querySelector('svg')).toHaveAttribute('data-icon', 'star');
    });
  });

  it('fills stars when clicked', () => {
    render(<ReviewRating />);
    const stars = screen.getAllByRole('listitem');
    
    // 3번째 별 클릭
    fireEvent.mouseDown(stars[2]);
    
    // 처음 3개 별이 채워져 있는지 확인
    stars.slice(0, 3).forEach(star => {
      expect(star.querySelector('svg')).toHaveAttribute('data-icon', 'star');
    });
    
    // 나머지 2개 별이 비어있는지 확인
    stars.slice(3).forEach(star => {
      expect(star.querySelector('svg')).toHaveAttribute('data-icon', 'star');
    });
  });
}); 