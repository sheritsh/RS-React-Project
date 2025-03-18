import { FC } from 'react';
import { getPasswordStrength } from '../utils/fileUtils';

interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter: FC<PasswordStrengthMeterProps> = ({
  password,
}) => {
  const strength = getPasswordStrength(password);

  const getLabel = (): string => {
    switch (strength) {
      case 0:
        return 'No password';
      case 1:
        return 'Weak';
      case 2:
        return 'Fair';
      case 3:
        return 'Good';
      case 4:
        return 'Strong';
      default:
        return '';
    }
  };

  const getColor = (): string => {
    switch (strength) {
      case 0:
        return 'bg-gray-200';
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-orange-500';
      case 3:
        return 'bg-yellow-500';
      case 4:
        return 'bg-green-500';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className="mt-1">
      <div className="flex h-2 mb-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-full w-1/4 ${index < strength ? getColor() : 'bg-gray-200'} ${index > 0 ? 'ml-1' : ''}`}
          />
        ))}
      </div>
      <p className="text-xs text-gray-600">{getLabel()}</p>
    </div>
  );
};

export { PasswordStrengthMeter };
