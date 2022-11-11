import React from 'react';
import { HomeOutlined, DatabaseOutlined, PoweroffOutlined } from '@ant-design/icons';

export interface SidebarNavigationItem {
  title: string;
  key: string;
  url?: string;
  children?: SidebarNavigationItem[];
  icon?: React.ReactNode;
}

export const sidebarNavigation: SidebarNavigationItem[] = [
  {
    title: 'common.home',
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    title: 'dynamoplus.common.collection',
    key: 'collections',
    icon: <DatabaseOutlined />,
    url: '/dynamoplus/collections',
  },
  {
    title: 'common.logout',
    key: 'logout',
    icon: <PoweroffOutlined />,
    url: '/logout',
  },
];
