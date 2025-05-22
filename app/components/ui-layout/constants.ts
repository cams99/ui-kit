import { ThemeConfig } from 'antd';

export const DARK_MODE_TOKEN: ThemeConfig = {
  token: {
    colorPrimary: '#2563EB',
    colorSuccessBg: '#EBFAEF',
    colorSuccess: '#35CA5A',
    colorBgContainer: '#374151',
  },
  components: {
    Typography: {
      fontWeightStrong: 700,
      titleMarginBottom: 0,
    },
    Layout: {
      headerBg: '#1F2937',
      headerHeight: 70,
      bodyBg: '#111827',
    },
    Divider: {
      colorSplit: '#4B5563',
    },
    Button: {
      borderRadius: 99,
      borderRadiusLG: 99,
      borderRadiusSM: 99,
      defaultShadow: 'none',
      dangerShadow: 'none',
      primaryShadow: 'none',
      fontWeight: 700,
      paddingInlineLG: 24,
      controlHeightLG: 48,
    },
    Input: {
      borderRadius: 99,
      borderRadiusLG: 99,
      borderRadiusSM: 99,
      controlHeightLG: 48,
    },
    Select: {
      controlHeightLG: 48,
    },
    Table: {
      headerColor: '#D1D5DB',
      headerBg: '#374151',
      headerBorderRadius: 8,
      lineHeight: 2,
      colorBgContainer: '#1F2937',
    },
    Tag: {
      lineType: 'none',
      borderRadiusSM: 99,
      defaultColor: '#64789B',
      defaultBg: '#EFF1F5',
    },
    Pagination: {
      itemActiveBg: '#2563EB',
      colorPrimary: '#EFF1F5',
      colorBorder: 'red',
      colorPrimaryBorder: 'red',
      controlOutline: 'blue',
    },
    Modal: {
      colorBgElevated: '#1F2937',
    },
    Form: {
      labelColor: '#C1C9D7',
    },
  },
};

export const LIGHT_MODE_TOKEN: ThemeConfig = {
  token: {
    colorPrimary: '#28303E',
    colorSuccessBg: '#EBFAEF',
    colorSuccess: '#35CA5A',
    colorBgContainer: '#FFFFFF',
  },
  components: {
    Typography: {
      fontWeightStrong: 700,
      titleMarginBottom: 0,
    },
    Layout: {
      headerBg: '#FFFFFF',
      headerHeight: 70,
      bodyBg: '#CBD5E1',
    },
    Divider: {
      colorSplit: '#EFF1F5',
    },
    Button: {
      borderRadius: 99,
      borderRadiusLG: 99,
      borderRadiusSM: 99,
      defaultShadow: 'none',
      dangerShadow: 'none',
      primaryShadow: 'none',
      fontWeight: 700,
      paddingInlineLG: 24,
      controlHeightLG: 48,
    },
    Input: {
      borderRadius: 99,
      borderRadiusLG: 99,
      borderRadiusSM: 99,
      controlHeightLG: 48,
    },
    Select: {
      controlHeightLG: 48,
    },
    Table: {
      headerColor: '#64789B',
      headerBg: '#EFF1F5',
      headerBorderRadius: 8,
      lineHeight: 2,
      colorBgContainer: '#FFFFFF',
    },
    Tag: {
      lineType: 'none',
      borderRadiusSM: 99,
      defaultColor: '#64789B',
      defaultBg: '#EFF1F5',
    },
    Pagination: {
      itemActiveBg: '#28303E',
      colorPrimary: '#EFF1F5',
      colorBorder: 'red',
      colorPrimaryBorder: 'red',
      controlOutline: 'blue',
    },
  },
};
