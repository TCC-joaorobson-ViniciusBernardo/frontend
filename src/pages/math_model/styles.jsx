import styled from 'styled-components';

export const StyledText = styled.p`
  font-style: normal;
  font-weight: ${props => (props.fontWeight || 'normal')};
  font-size: ${props => (props.fontSize || 'initial')};
  line-height: ${props => (props.lineHeight || 'initial')};
  text-transform: ${props => (props.textTransform || 'none')};
  color: ${props => (props.color || 'initial')};
  margin: ${props => (props.margin || 'initial')};
  overflow: ${props => props.overflow || 'unset'};
  text-overflow: ${props => props.textOverflow || 'unset'};
  white-space: ${props => props.whiteSpace || 'initial'};
`;