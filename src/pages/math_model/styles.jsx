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

export const FlexDiv = styled.div`
  display: flex;
  flex-direction: ${props => props.flexDirection || 'row'};
  flex-wrap: ${props => props.flexWrap || 'nowrap'};
  justify-content: ${props => props.justifyContent || 'initial'};
  padding: ${props => props.padding || 'initial'};
  margin: ${props => props.margin || 'initial'};
  flex-basis: ${props => props.flexBasis || 'initial'};
  width: ${props => props.width || 'initial'};
  height: ${props => props.height || 'initial'};
  cursor: ${props => props.cursor || 'unset'};
  min-width: ${props => props.minWidth || 'initial'};
  max-width: ${props => props.maxWidth || 'initial'};
  min-height: ${props => props.minHeight || 'initial'};
  max-height: ${props => props.maxHeight || 'initial'};
  overflow: ${props => props.overflow || 'unset'};
  text-align: ${props => props.textAlign || 'unset'};
  border-radius: ${props => props.borderRadius || 'unset'};
  border: ${props => props.border || 'unset'};
  background-color: ${props => props.backgroundColor || 'initial'};
  align-items: ${props => props.alignItems || 'initial'};

  &:hover {
    background-color: ${props => props.backgroundColorOnHover || props.backgroundColor};
    cursor: ${props => props.cursor || 'unset'};
  }
`;