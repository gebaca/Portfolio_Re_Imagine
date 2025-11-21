import React, { useEffect } from 'react';
import { useCycle, motion } from 'framer-motion';
import styles from './ProfileAnimation.module.css';
import { PROFILE_FRAMES } from '../../../assets/profileFrames';

interface ProfileAnimationProps {
  animationIntervalMs?: number;
  className?: string;
}
const ProfileAnimation: React.FC<ProfileAnimationProps> = ({
  animationIntervalMs = 1500,
  className,
}) => {
  return null;
};

export default ProfileAnimation;
