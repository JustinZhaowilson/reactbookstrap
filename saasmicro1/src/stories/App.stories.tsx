import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, userEvent } from '@storybook/test';
import App from '../App';

const meta = {
  title: 'Example/App',
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HomePage: Story = {
  args: {},
};

export const ProjectsPage: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const projectsButton = await canvas.getByText('Projects');
    await userEvent.click(projectsButton);
  },
};

export const TaskBoardsPage: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const taskBoardsButton = await canvas.getByText('Task Boards');
    await userEvent.click(taskBoardsButton);
  },
};

export const UsersPage: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const usersButton = await canvas.getByText('Users');
    await userEvent.click(usersButton);
  },
};

export const PlansPage: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const plansButton = await canvas.getByText('Plans');
    await userEvent.click(plansButton);
  },
};

export const ContactsPage: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const contactsButton = await canvas.getByText('Contacts');
    await userEvent.click(contactsButton);
  },
};
