import { Steps as ArkSteps } from '@ark-ui/react/steps';
import type { CSSProperties } from 'react';
import {
  color,
  fontSize,
  fontWeight,
  lineHeight,
  spacing,
} from '../../tokens/tokens';

export interface StepperStep {
  title: string;
  description?: string;
}

export interface StepperProps {
  /**
   * Steps to render
   */
  steps: StepperStep[];

  /**
   * Controlled active step index
   */
  step?: number;

  /**
   * Initial active step index (uncontrolled)
   * @default 0
   */
  defaultStep?: number;

  /**
   * Called when the active step changes
   */
  onStepChange?: (details: { step: number }) => void;

  /**
   * Orientation of the stepper
   * @default "horizontal"
   */
  orientation?: 'horizontal' | 'vertical';

  /**
   * Size of the stepper: 'small', 'medium', or 'large'
   */
  size?: 'small' | 'medium' | 'large';
}

const getSizeStyles = (size: 'small' | 'medium' | 'large') => {
  const sizeMap = {
    small: {
      indicatorSize: spacing[6],
      indicatorFontSize: fontSize[12],
      titleFontSize: fontSize[12],
      descriptionFontSize: fontSize[11],
      gap: spacing[2],
      thickness: '2px',
      contentPadding: spacing[3],
      buttonPadding: `${spacing[1]} ${spacing[2]}`,
      buttonFontSize: fontSize[12],
    },
    medium: {
      indicatorSize: spacing[8],
      indicatorFontSize: fontSize[14],
      titleFontSize: fontSize[14],
      descriptionFontSize: fontSize[12],
      gap: spacing[3],
      thickness: '2px',
      contentPadding: spacing[4],
      buttonPadding: `${spacing[2]} ${spacing[3]}`,
      buttonFontSize: fontSize[14],
    },
    large: {
      indicatorSize: spacing[10],
      indicatorFontSize: fontSize[16],
      titleFontSize: fontSize[16],
      descriptionFontSize: fontSize[14],
      gap: spacing[4],
      thickness: '3px',
      contentPadding: spacing[5],
      buttonPadding: `${spacing[3]} ${spacing[4]}`,
      buttonFontSize: fontSize[16],
    },
  };

  return sizeMap[size];
};

const Stepper = ({
  steps,
  step,
  defaultStep = 0,
  onStepChange,
  orientation = 'horizontal',
  size = 'medium',
}: StepperProps) => {
  const sizeStyles = getSizeStyles(size);
  const isVertical = orientation === 'vertical';

  const rootStyle: CSSProperties = {
    display: 'flex',
    width: '100%',
    maxWidth: isVertical ? '480px' : '640px',
    fontFamily: 'inherit',
    flexDirection: isVertical ? 'row' : 'column',
    gap: sizeStyles.gap,
    minHeight: isVertical ? '320px' : undefined,
  };

  const listStyle: CSSProperties = {
    display: 'flex',
    flexDirection: isVertical ? 'column' : 'row',
    alignItems: isVertical ? 'flex-start' : 'center',
    justifyContent: 'space-between',
    width: isVertical ? 'auto' : '100%',
  };

  const itemStyle: CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: isVertical ? 'flex-start' : 'center',
    gap: sizeStyles.gap,
    flex: isVertical ? undefined : '1 0 0',
  };

  const triggerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: sizeStyles.gap,
    padding: 0,
    background: 'transparent',
    border: 'none',
    fontFamily: 'inherit',
    cursor: 'pointer',
    textAlign: 'start',
    color: color.slate800,
  };

  const indicatorBaseStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: sizeStyles.indicatorSize,
    height: sizeStyles.indicatorSize,
    fontSize: sizeStyles.indicatorFontSize,
    fontWeight: fontWeight.semibold,
    borderRadius: '9999px',
    border: `${sizeStyles.thickness} solid ${color.slate300}`,
    backgroundColor: color.white,
    color: color.slate600,
    boxSizing: 'border-box',
  };

  const separatorStyle: CSSProperties = isVertical
    ? {
        position: 'absolute',
        width: sizeStyles.thickness,
        height: '100%',
        maxHeight: `calc(100% - ${sizeStyles.indicatorSize} - ${spacing[2]})`,
        top: `calc(${sizeStyles.indicatorSize} + ${spacing[1]})`,
        left: `calc(${sizeStyles.indicatorSize} / 2 - 1px)`,
        backgroundColor: color.slate300,
        marginInline: 0,
      }
    : {
        flex: 1,
        height: sizeStyles.thickness,
        backgroundColor: color.slate300,
        marginInline: spacing[2],
      };

  const titleStyle: CSSProperties = {
    display: 'block',
    fontSize: sizeStyles.titleFontSize,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight[20],
    color: color.slate800,
  };

  const descriptionStyle: CSSProperties = {
    display: 'block',
    fontSize: sizeStyles.descriptionFontSize,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight[20],
    color: color.slate500,
  };

  const contentStyle: CSSProperties = {
    padding: sizeStyles.contentPadding,
    fontSize: sizeStyles.titleFontSize,
    color: color.slate700,
    backgroundColor: color.slate50,
    borderRadius: spacing[2],
    border: `1px solid ${color.slate200}`,
    minHeight: spacing[20],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: isVertical ? 1 : undefined,
    boxSizing: 'border-box',
  };

  const actionsStyle: CSSProperties = {
    display: 'flex',
    gap: spacing[2],
    justifyContent: 'flex-end',
  };

  const actionButtonStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: sizeStyles.buttonPadding,
    fontSize: sizeStyles.buttonFontSize,
    fontWeight: fontWeight.medium,
    fontFamily: 'inherit',
    borderRadius: spacing[1],
    border: `1px solid ${color.slate300}`,
    backgroundColor: color.white,
    color: color.slate800,
    cursor: 'pointer',
  };

  return (
    <ArkSteps.Root
      count={steps.length}
      step={step}
      defaultStep={step === undefined ? defaultStep : undefined}
      onStepChange={onStepChange}
      orientation={orientation}
      style={rootStyle}
    >
      <ArkSteps.List style={listStyle}>
        {steps.map((item, index) => (
          <ArkSteps.Item
            key={index}
            index={index}
            style={{
              ...itemStyle,
              ...(index === steps.length - 1 && !isVertical
                ? { flex: 'initial' }
                : null),
            }}
          >
            <ArkSteps.Trigger style={triggerStyle}>
              <ArkSteps.ItemContext>
                {(itemState) => (
                  <ArkSteps.Indicator
                    style={{
                      ...indicatorBaseStyle,
                      ...(itemState.current
                        ? {
                            borderColor: color.blue500,
                            backgroundColor: color.blue50,
                            color: color.blue600,
                          }
                        : null),
                      ...(itemState.completed
                        ? {
                            borderColor: color.blue500,
                            backgroundColor: color.blue500,
                            color: color.white,
                          }
                        : null),
                    }}
                  >
                    {itemState.completed ? '✓' : index + 1}
                  </ArkSteps.Indicator>
                )}
              </ArkSteps.ItemContext>
              <span>
                <span style={titleStyle}>{item.title}</span>
                {item.description ? (
                  <span style={descriptionStyle}>{item.description}</span>
                ) : null}
              </span>
            </ArkSteps.Trigger>
            {index < steps.length - 1 ? (
              <ArkSteps.ItemContext>
                {(itemState) => (
                  <ArkSteps.Separator
                    style={{
                      ...separatorStyle,
                      ...(itemState.completed
                        ? { backgroundColor: color.blue500 }
                        : null),
                    }}
                  />
                )}
              </ArkSteps.ItemContext>
            ) : null}
          </ArkSteps.Item>
        ))}
      </ArkSteps.List>

      {steps.map((item, index) => (
        <ArkSteps.Content key={index} index={index} style={contentStyle}>
          {item.description
            ? `${item.title} — ${item.description}`
            : `Step ${index + 1} content`}
        </ArkSteps.Content>
      ))}

      <ArkSteps.CompletedContent style={contentStyle}>
        All steps complete
      </ArkSteps.CompletedContent>

      <div style={actionsStyle}>
        <ArkSteps.PrevTrigger style={actionButtonStyle}>Back</ArkSteps.PrevTrigger>
        <ArkSteps.NextTrigger
          style={{
            ...actionButtonStyle,
            backgroundColor: color.blue500,
            borderColor: color.blue500,
            color: color.white,
          }}
        >
          Next
        </ArkSteps.NextTrigger>
      </div>
    </ArkSteps.Root>
  );
};

export default Stepper;
