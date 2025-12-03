import { Button } from '../button';
import { ButtonGroup } from '../button-group';
import { LoadMoreButtonProps } from './types';

export const LoadMoreButton = ({ isLoading, onClick }: LoadMoreButtonProps) => {
  return (
    <ButtonGroup className="mt-sm" justify="justify-center" fullWidth>
      <Button
        color="info"
        isLoading={isLoading}
        label={isLoading ? 'Loading more...' : 'Load more ...'}
        onClick={onClick}
        type="button"
        variant="outlined"
      />
    </ButtonGroup>
  );
};
