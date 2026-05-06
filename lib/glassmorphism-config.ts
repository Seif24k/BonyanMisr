/**
 * Glassmorphism Design System Configuration
 * 
 * This file contains all design tokens for the glassmorphism design system.
 * All values are centralized here to ensure consistency across components.
 * 
 * Requirements: 1.1, 1.2, 1.5, 10.1
 */

export interface GlassmorphismConfig {
  blur: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  opacity: {
    light: {
      background: number;
      border: number;
    };
    dark: {
      background: number;
      border: number;
    };
  };
  colors: {
    light: {
      background: string;
      border: string;
      shadow: string;
    };
    dark: {
      background: string;
      border: string;
      shadow: string;
    };
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  transitions: {
    fast: string;
    normal: string;
    slow: string;
  };
}

/**
 * Glassmorphism configuration object with all design token values
 * 
 * Blur values: 8px - 24px (Requirement 1.2)
 * Opacity values: 0.1 - 0.3 (Requirement 1.1)
 * Transition durations: 150ms - 300ms (Requirement 6.4)
 */
export const glassmorphismConfig: GlassmorphismConfig = {
  blur: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
  },
  opacity: {
    light: {
      background: 0.1,
      border: 0.2,
    },
    dark: {
      background: 0.2,
      border: 0.3,
    },
  },
  colors: {
    light: {
      background: 'rgb(255 255 255)',
      border: 'rgb(255 255 255)',
      shadow: 'rgb(0 0 0)',
    },
    dark: {
      background: 'rgb(0 0 0)',
      border: 'rgb(255 255 255)',
      shadow: 'rgb(0 0 0)',
    },
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
  shadows: {
    sm: '0 2px 8px -2px',
    md: '0 4px 16px -4px',
    lg: '0 8px 32px -8px',
  },
  transitions: {
    fast: '150ms',
    normal: '200ms',
    slow: '300ms',
  },
};

/**
 * Validation error class for glassmorphism configuration
 */
export class GlassmorphismConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GlassmorphismConfigError';
  }
}

/**
 * Validates that a blur value is within the acceptable range (8px - 24px)
 * 
 * @param blur - Blur value string (e.g., '12px')
 * @param context - Context for error message
 * @throws {GlassmorphismConfigError} If blur value is outside valid range
 */
function validateBlur(blur: string, context: string): void {
  const value = parseInt(blur);
  if (isNaN(value)) {
    throw new GlassmorphismConfigError(
      `${context} blur value "${blur}" is not a valid number`
    );
  }
  if (value < 8 || value > 24) {
    throw new GlassmorphismConfigError(
      `${context} blur value ${blur} is outside valid range (8px-24px)`
    );
  }
}

/**
 * Validates that an opacity value is within the acceptable range (0.1 - 0.3)
 * 
 * @param opacity - Opacity value (0.0 - 1.0)
 * @param context - Context for error message
 * @throws {GlassmorphismConfigError} If opacity value is outside valid range
 */
function validateOpacity(opacity: number, context: string): void {
  if (typeof opacity !== 'number' || isNaN(opacity)) {
    throw new GlassmorphismConfigError(
      `${context} opacity value "${opacity}" is not a valid number`
    );
  }
  if (opacity < 0.1 || opacity > 0.3) {
    throw new GlassmorphismConfigError(
      `${context} opacity ${opacity} is outside valid range (0.1-0.3)`
    );
  }
}

/**
 * Validates that a transition duration is within the acceptable range (150ms - 300ms)
 * 
 * @param duration - Duration value string (e.g., '200ms')
 * @param context - Context for error message
 * @throws {GlassmorphismConfigError} If duration is outside valid range
 */
function validateTransition(duration: string, context: string): void {
  const value = parseInt(duration);
  if (isNaN(value)) {
    throw new GlassmorphismConfigError(
      `${context} transition duration "${duration}" is not a valid number`
    );
  }
  if (value < 150 || value > 300) {
    throw new GlassmorphismConfigError(
      `${context} transition duration ${duration} is outside valid range (150ms-300ms)`
    );
  }
}

/**
 * Validates the entire glassmorphism configuration
 * 
 * Ensures all values are within acceptable ranges:
 * - Blur: 8px - 24px (Requirement 1.2)
 * - Opacity: 0.1 - 0.3 (Requirement 1.1)
 * - Transitions: 150ms - 300ms (Requirement 6.4)
 * 
 * @param config - The glassmorphism configuration to validate
 * @throws {GlassmorphismConfigError} If any value is outside valid range
 */
export function validateGlassmorphismConfig(config: GlassmorphismConfig): void {
  // Validate blur values
  validateBlur(config.blur.sm, 'Small');
  validateBlur(config.blur.md, 'Medium');
  validateBlur(config.blur.lg, 'Large');
  validateBlur(config.blur.xl, 'Extra large');

  // Validate opacity values
  validateOpacity(config.opacity.light.background, 'Light background');
  validateOpacity(config.opacity.light.border, 'Light border');
  validateOpacity(config.opacity.dark.background, 'Dark background');
  validateOpacity(config.opacity.dark.border, 'Dark border');

  // Validate transition durations
  validateTransition(config.transitions.fast, 'Fast');
  validateTransition(config.transitions.normal, 'Normal');
  validateTransition(config.transitions.slow, 'Slow');

  // Validate that required color properties exist
  const requiredColorProps = ['background', 'border', 'shadow'];
  
  requiredColorProps.forEach(prop => {
    if (!config.colors.light[prop as keyof typeof config.colors.light]) {
      throw new GlassmorphismConfigError(
        `Light theme is missing required color property: ${prop}`
      );
    }
    if (!config.colors.dark[prop as keyof typeof config.colors.dark]) {
      throw new GlassmorphismConfigError(
        `Dark theme is missing required color property: ${prop}`
      );
    }
  });

  // Validate that border radius values exist
  const requiredSizes = ['sm', 'md', 'lg', 'xl'];
  requiredSizes.forEach(size => {
    if (!config.borderRadius[size as keyof typeof config.borderRadius]) {
      throw new GlassmorphismConfigError(
        `Border radius is missing required size: ${size}`
      );
    }
  });

  // Validate that shadow values exist
  const requiredShadowSizes = ['sm', 'md', 'lg'];
  requiredShadowSizes.forEach(size => {
    if (!config.shadows[size as keyof typeof config.shadows]) {
      throw new GlassmorphismConfigError(
        `Shadows are missing required size: ${size}`
      );
    }
  });
}

// Validate the default configuration on module load
validateGlassmorphismConfig(glassmorphismConfig);
