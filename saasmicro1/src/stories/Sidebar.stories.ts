import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, userEvent } from '@storybook/test';
import { Sidebar } from './Sidebar';

const meta = {
  title: 'Example/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Expanded: Story = {
  args: {
    setCurrentPage: (page) => console.log(page),
  },
};

export const Collapsed: Story = {
  args: {
    ...Expanded.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const collapseButton = await canvas.getByRole('button');
    await userEvent.click(collapseButton);
  },
};
