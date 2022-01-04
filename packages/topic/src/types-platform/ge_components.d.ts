/* eslint-disable */
declare module 'ge_components/@act/CircleProgress' {
  import React, { HTMLAttributes } from 'react';
  export type CircleProgressType = {
      r: number;
      percent?: number;
      strokeWidth?: number;
      borderOffset?: number;
      visible?: boolean;
      edgeSlot?: React.ReactNode;
      centerSlot?: React.ReactNode;
      edgeStyle?: React.HTMLAttributes<HTMLDivElement>['style'];
      centerStyle?: React.HTMLAttributes<HTMLDivElement>['style'];
  } & HTMLAttributes<HTMLElement>;
  export const CircleProgress: ({ r, percent, strokeWidth, borderOffset, visible, edgeSlot, centerSlot, centerStyle, edgeStyle: edgeStyleProps, ...otherProps }: CircleProgressType) => JSX.Element;
  export default CircleProgress;

}
declare module 'ge_components/@act/DefaultModal' {
  import { ModalProps } from '@/@base/Modal';
  export type DefaultModalProps = ModalProps & {
      /** 默认内容位置插槽 */
      content?: any;
      /** 标题栏插槽 */
      titleText?: string;
      /** 确认按钮文本 */
      okText?: string;
      /** 取消按钮文本 */
      cancelText?: string;
      /** 确认按钮回调 */
      onOk?: () => void;
      onCancel?: () => void;
      className?: string;
  };
  export const DefaultModal: (props: DefaultModalProps) => JSX.Element;
  export const showAlert: (props: DefaultModalProps) => {
      destroy: () => void;
      update: (newProps: ModalProps) => void;
      close: () => void;
  };
  export const showConfirm: (props: DefaultModalProps) => {
      destroy: () => void;
      update: (newProps: ModalProps) => void;
      close: () => void;
  };
  export default DefaultModal;

}
declare module 'ge_components/@act/Icon/LegionIcon' {
  import PropTypes from 'prop-types';
  interface LegionIconProps {
      legionLevel?: number;
      legionName: string;
      userLevel?: number;
  }
  function LegionIcon({ legionLevel, legionName, userLevel }: LegionIconProps): JSX.Element;
  namespace LegionIcon {
      var propTypes: {
          legionLevel: PropTypes.Requireable<number>;
          legionName: PropTypes.Requireable<string>;
          userLevel: PropTypes.Requireable<number>;
      };
  }
  export default LegionIcon;

}
declare module 'ge_components/@act/Icon/Noble' {
  import PropTypes from 'prop-types';
  interface NobelProps {
      grade: number;
      className?: string;
  }
  function Noble({ grade, className }: NobelProps): JSX.Element | null;
  namespace Noble {
      var propTypes: {
          grade: PropTypes.Requireable<number>;
          className: PropTypes.Requireable<string>;
      };
  }
  export default Noble;

}
declare module 'ge_components/@act/Icon/TaskGrade' {
  import PropTypes from 'prop-types';
  interface TaskGradeProps {
      level: number;
  }
  function TaskGrade({ level }: TaskGradeProps): JSX.Element;
  namespace TaskGrade {
      var propTypes: {
          level: PropTypes.Requireable<number>;
      };
  }
  export default TaskGrade;

}
declare module 'ge_components/@act/Icon' {
  import Noble from 'ge_components/@act/Icon/Noble';
  import LegionIcon from 'ge_components/@act/Icon/LegionIcon';
  import TaskGrade from 'ge_components/@act/Icon/TaskGrade';
  export { Noble, LegionIcon, TaskGrade };
  const _default: {
      Noble: typeof Noble;
      LegionIcon: typeof LegionIcon;
      TaskGrade: typeof TaskGrade;
  };
  export default _default;

}
declare module 'ge_components/@act/PropsIcon' {
  import { HTMLAttributes } from 'react';
  export type PropsIconType = {
      /** 礼物id，用于获取礼物图标 */
      propsId: number;
      /** 礼物数量 */
      propsCount?: number;
      /** 礼物名称 */
      propsName?: string;
      /** 礼物图片url */
      propsIcon?: string;
      /** 是否带Tippy */
      showTip?: boolean;
      /** 是否预加载礼物Tippy信息 */
      autoLoadTip?: boolean;
      /** 当item.propsCount为0时，是否加上灰色蒙层 */
      grayFilter?: boolean;
      /** 默认礼物图标 */
      defaultIconUrl?: string;
      imgAttr?: HTMLAttributes<HTMLImageElement>;
  };
  /**
   * 交友礼物图标
   */
  export const PropsIcon: {
      (props: PropsIconType): JSX.Element;
      defaultProps: {
          showTip: boolean;
          propsId: number;
          autoLoadTip: boolean;
      };
  };
  export default PropsIcon;

}
declare module 'ge_components/@act/PropsIcon/type' {
  export type PropItem = {
      propsId: number;
      name: string;
      Desc: {
          description: string;
      };
      desc: string;
  };
  export type PropsConfigInfoType = {
      status: 0 | number;
      msg: string;
      propsIds: number[];
      list: PropItem[] | null;
  };

}
declare module 'ge_components/@act/PropsIcon/utils' {
  export function getPropIcon(propId: string | number, size?: number): string;
  export const getPropsInfo: (query: any) => import("@/utils/request").FrPromise<any>;

}
declare module 'ge_components/@act/ScrollText' {
  import React from 'react';
  interface ScrollTextProps {
      /** 容器的宽度 */
      width?: string | number;
      /** 容器的高度 */
      height?: string | number;
      /** 滚动的速度，即每秒移动的长度，单位px */
      speed?: number;
      /** 是否垂直方向 */
      isVertical?: boolean;
      /** 滚动的内容 */
      children?: React.ReactChild;
  }
  /** 滚动播放文案组件 */
  export const ScrollText: (props: ScrollTextProps) => JSX.Element;
  export default ScrollText;

}
declare module 'ge_components/@act/Sidebar' {
  import React from 'react';
  export type SidebarType = {
      list: {
          name: any;
          offset?: number;
          href: string;
      }[];
      /** 距离顶部大于此值，控制显示SideBar */
      scrollTopThreshold?: number;
      /** 窗口宽大大于此值，控制显示SideBar */
      winWidthThreshold?: number;
      /** 锚点判断的偏移值 */
      offset?: number;
      /** 是否显示我要参与 */
      bbs?: boolean;
      /** css modules对象  */
      styles?: any;
  };
  /** 侧边栏组件 */
  export function Sidebar(props: SidebarType): JSX.Element;
  export const SideBarWithStyles: React.FC<any>;
  export default Sidebar;

}
declare module 'ge_components/@act/Subscribe/api' {
  export function subscribe_compere(query: any): import("ge_components/utils/request").FrPromise<any>;
  export function unsubscribe_compere(query: any): import("ge_components/utils/request").FrPromise<any>;

}
declare module 'ge_components/@act/Subscribe' {
  import { Props } from 'ge_components/@act/Subscribe/interface';
  /** 交友主持关注按钮 */
  export function Subscribe({ subscribed, uid, text, styles, removable }: Props): JSX.Element;
  export default Subscribe;

}
declare module 'ge_components/@act/Subscribe/interface' {
  export interface Props {
      subscribed: boolean;
      uid: number | string;
      text?: string;
      styles?: StylesProps;
      removable?: boolean;
  }
  export interface Evt {
      [x: string]: any;
  }
  export interface HandleClick {
      (evt: Evt, fetch: any): void;
  }

}
declare module 'ge_components/@act/TabChangeWithDate' {
  import React from 'react';
  import { useTabType } from '@/@hooks';
  type ReactComponent<P = any> = React.FC<P> | React.ComponentClass<P> | React.ClassicComponentClass<P>;
  export interface TabChangeWithDateProps {
      tab?: any;
      tabList?: useTabType['list'];
      tabStyles?: useTabType['styles'];
      needDateChange?: Boolean;
      dateChangeJudge?: Function;
      DateChangeCpt?: ReactComponent;
  }
  /** 日期切换组件 */
  export function TabChangeWithDate<T>({ tab, tabList, tabStyles, needDateChange, dateChangeJudge, DateChangeCpt, ...otherProps }: TabChangeWithDateProps & T): JSX.Element;
  export default TabChangeWithDate;

}
declare module 'ge_components/@act/TopLight' {
  import React from 'react';
  export type TopLightButtonType = {
      /** 当前时间 */
      current?: number;
      /** 开始时间 */
      begin?: number;
      /** TopLight的样式表，传入css-modules覆盖 */
      /** 尾灯url的数组 */
      urlList?: string[];
      propsName?: string;
      forwardRef?: React.ClassAttributes<HTMLDivElement>['ref'];
  };
  export const TopLightButton: ({ current, begin, forwardRef, urlList, propsName }: TopLightButtonType) => JSX.Element;
  /** 点亮尾灯组件 */
  export const TopLight: React.FC<any>;
  export default TopLight;

}
declare module 'ge_components/@act' {
  export * from 'ge_components/@act/CircleProgress';
  export * from 'ge_components/@act/DefaultModal';
  export * from 'ge_components/@act/Icon';
  export * from 'ge_components/@act/PropsIcon';
  export * from 'ge_components/@act/ScrollText';
  export * from 'ge_components/@act/Sidebar';
  export * from 'ge_components/@act/Subscribe';
  export * from 'ge_components/@act/TabChangeWithDate';
  export * from 'ge_components/@act/TopLight';

}
declare module 'ge_components/@base/Avatar/__tests__/index.test' {

}
declare module 'ge_components/@base/Avatar' {
  import React, { HTMLAttributes } from 'react';
  export type AvatarProps = {
      /** 图片的地址 */
      imgSrc?: string;
      /** 下载失败时加载的图片地址 */
      error?: string;
      /** 可以传入的默认slot节点 */
      children?: any;
      styles?: any;
      /** 同原生onerror */
      onError?: (event: React.SyntheticEvent<Element, Event>) => void;
      className?: string;
      imgAttr?: HTMLAttributes<HTMLImageElement>;
  };
  /** 通用头像组件 */
  export const Avatar: ({ imgSrc, error, onError, children, className, styles, imgAttr }: AvatarProps) => JSX.Element;
  export default Avatar;

}
declare module 'ge_components/@base/Avatar/interface' {

}
declare module 'ge_components/@base/Button' {
  import { HTMLAttributes } from 'react';
  export type ButtonProps = {
      styles?: StylesProps;
      className?: string;
      loading?: boolean;
      disabled?: boolean;
      disabledText?: string;
      text?: string;
      loadingText?: any;
      domAttr?: HTMLAttributes<HTMLAnchorElement>;
      children?: any;
      onClick: HTMLAttributes<HTMLAnchorElement>['onClick'];
  };
  /** 通用按钮组件 */
  export const Button: (props: ButtonProps) => JSX.Element;
  export default Button;

}
declare module 'ge_components/@base/CounterDisplay' {
  import * as React from 'react';
  export interface CounterDisplayProps {
      value?: number;
      label?: string;
  }
  export default class CounterDisplay extends React.PureComponent<CounterDisplayProps> {
      render(): React.ReactNode;
  }

}
declare module 'ge_components/@base/DataContainer' {
  import { DataContainerProps } from 'ge_components/@base/DataContainer/interface';
  export function DataContainer({ styles, children, loading, error, data, loadingText, errorText, quietRefresh, className, ...otherProps }: DataContainerProps): JSX.Element;
  export default DataContainer;

}
declare module 'ge_components/@base/DataContainer/interface' {
  /// <reference types="react" />
  import { FetchRes } from 'ge_components/@base/Fetch/interface';
  export type DataContainerProps<DataProps = any> = {
      styles?: StylesProps & {
          container?: string;
          info?: string;
      };
      /** 加载中的显示文本 */
      loadingText?: string | React.ReactNode;
      /** 加载失败的显示文本 */
      errorText?: string | React.ReactNode;
      /** 若为`true`，再次刷新时不显示loadingText */
      quietRefresh?: boolean;
  } & FetchRes<DataProps> & React.HTMLAttributes<HTMLDivElement>;

}
declare module 'ge_components/@base/DateChange' {
  import React from 'react';
  export interface DateChangeProps {
      active: number;
      begin: number;
      end: number;
      onDateChange: Function;
      format?: string;
      styles?: StylesProps;
  }
  export const DateChange: ({ format, styles, ...props }: DateChangeProps) => JSX.Element;
  const _default: React.FC<any>;
  export default _default;

}
declare module 'ge_components/@base/Fetch/SimpleCache' {
  export default class SimpleCache {
      constructor(timeout?: boolean | number, storageCache?: boolean);
      cache: {
          [key: string]: any;
      };
      storageCache: boolean;
      get(name: string): any;
      set(name: string, value: any): void;
      remove(name: string): void;
      clear(): void;
  }

}
declare module 'ge_components/@base/Fetch' {
  import { FetchProps } from 'ge_components/@base/Fetch/interface';
  import useFetch from 'ge_components/@base/Fetch/useFetch';
  const Fetch: (props: FetchProps) => JSX.Element;
  export { Fetch, useFetch };
  export default Fetch;

}
declare module 'ge_components/@base/Fetch/interface' {
  export enum ActionType {
      SetState = "setState"
  }
  export interface FetchRes<DataProps> extends FetchState<DataProps> {
      /** `query`是传入`api`的参数，该方法可以重置`query`，触发重新请求 */
      setQuery?: (query: any) => void;
      /** 提供手动触发的fetch方法，当`manual`指定时，可通过此方法调用 */
      fetch?: () => Promise<{
          data?: DataProps;
          err?: any;
      } | undefined>;
  }
  export interface FetchProps<DataProps = any> {
      /** 函数接收当前的 context 值，并返回一个 React 节点, 传递给函数的`value`来源于FetchContext.Provider */
      children?: (res: FetchRes<DataProps>) => any;
      /** 提供一个返回Promise实例的function，供Fetch容器执行 */
      api: ((...value: any) => Promise<{
          data: DataProps;
          err?: any;
      }>) | Function;
      /** 你可以通过此参数修改`api`的传参，触发promise（即传入的api）重新执行*/
      query?: object;
      /** 如果返回`false`或者string型的错误信息，则会从fetchContext抛出error */
      validate?: (data: DataProps) => boolean | string;
      /** 是否定时重新触发`api`执行，若传`true`则60秒刷新一次 */
      refresh?: boolean | number;
      /** 加载成功的回调 */
      onData?: (data: DataProps) => any;
      /** 是否手动触发，当为`true`时，使用FetchContext的`fetch`方法触发promise */
      manual?: boolean;
      /** 请求前延时, 单位毫秒 */
      delay?: number;
      /** 若开启，则会使用`Object`，以query作为索引缓存请求数据，默认关闭 */
      cache?: boolean | number;
      /** 若开启，则会使用`sessionStorage`，以query作为索引缓存请求数据，默认关闭 */
      storageCache?: boolean;
  }
  export interface FetchState<DataProps = any> {
      loading?: boolean;
      error?: Error;
      data?: DataProps;
  }
  export interface FetchAction {
      type: ActionType;
      payload: FetchState<any>;
  }

}
declare module 'ge_components/@base/Fetch/useFetch' {
  import { FetchProps, FetchRes } from 'ge_components/@base/Fetch/interface';
  export function useFetch<DataProps = any>({ onData, api, query, validate, delay, cache, manual, refresh, storageCache }: FetchProps<DataProps>): FetchRes<DataProps>;
  export default useFetch;

}
declare module 'ge_components/@base/Modal/Modal' {
  import IDialogPropTypes from 'rc-dialog/lib/IDialogPropTypes';
  export type ModalProps = IDialogPropTypes & {
      /** 注意：此方法仅用于命令式调用call中注入，用于关闭弹框 */
      destroy?: () => void;
      /** @deprecated 用destroy替代此属性 */
      close?: () => void;
  };
  export const Modal: ({ destroy, prefixCls, title, afterClose, ...restProps }: ModalProps) => JSX.Element;
  export default Modal;

}
declare module 'ge_components/@base/Modal/call' {
  import React from 'react';
  import { ModalProps } from 'ge_components/@base/Modal/Modal';
  export function callModal<T = ModalProps>(Component?: React.FC<ModalProps>, props?: T): {
      destroy: () => void;
      update: (newProps: ModalProps) => void;
      /** @deprecated */
      close: () => void;
  };
  export default callModal;

}
declare module 'ge_components/@base/Modal' {
  import { Modal } from 'ge_components/@base/Modal/Modal';
  import type { ModalProps } from 'ge_components/@base/Modal/Modal';
  import callModal from 'ge_components/@base/Modal/call';
  export { callModal, Modal };
  export type { ModalProps };
  export default Modal;

}
declare module 'ge_components/@base/Page/Page' {
  import React from 'react';
  interface PageProps {
      className?: string;
      [x: string]: any;
  }
  function Page({ className, ...props }: PageProps): React.ReactNode;
  namespace Page {
      let Container: React.FunctionComponent<PageProps>;
      let Section: React.FunctionComponent<PageProps>;
      let Content: React.FunctionComponent<PageProps>;
      let Header: React.FunctionComponent<PageProps>;
  }
  const PageContainer: {
      ({ className, ...props }: {
          [x: string]: any;
      }): JSX.Element;
      propTypes: {
          className: import("prop-types").Requireable<string>;
      };
  };
  const PageSection: {
      ({ className, ...props }: {
          [x: string]: any;
      }): JSX.Element;
      propTypes: {
          className: import("prop-types").Requireable<string>;
      };
  };
  const PageContent: {
      ({ className, ...props }: {
          [x: string]: any;
      }): JSX.Element;
      propTypes: {
          className: import("prop-types").Requireable<string>;
      };
  };
  export default Page;
  export { PageContainer, PageSection, PageContent };

}
declare module 'ge_components/@base/Page/PageHeader' {
  import PropTypes from 'prop-types';
  interface PageHeaderProps {
      style?: object;
      className?: string;
      children?: any;
      videoSrc?: string;
  }
  function PageHeader({ style, className, children, videoSrc }: PageHeaderProps): JSX.Element;
  namespace PageHeader {
      var propTypes: {
          videoSrc: PropTypes.Requireable<string>;
          style: PropTypes.Requireable<object>;
          children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
          className: PropTypes.Requireable<string>;
      };
  }
  export default PageHeader;

}
declare module 'ge_components/@base/Page' {
  import Page, { PageContainer, PageSection, PageContent } from 'ge_components/@base/Page/Page';
  import PageHeader from 'ge_components/@base/Page/PageHeader';
  export default Page;
  export { PageContainer, PageSection, PageContent, PageHeader };

}
declare module 'ge_components/@base/Pagination' {
  export interface PaginationProps {
      styles?: StylesProps | Partial<{
          pagination: string;
          content: string;
          number: string;
          disabled: string;
          active: string;
          prev: string;
          next: string;
      }>;
      initialPage: number;
      total: number;
      onChange?(num: number): void;
  }
  export const Pagination: (props: PaginationProps) => JSX.Element | null;
  export default Pagination;

}
declare module 'ge_components/@base/RankItem' {
  import React, { HTMLAttributes } from 'react';
  export type RankItemProps = {
      contractAsid?: number | string;
      asid?: number | string;
      ssid?: number | string;
      sid?: number | string;
      place: number | string;
      avatar: string;
      label?: string;
      nick: string;
      value: number;
      uid: number;
  };
  export type RankItemType = {
      /** 榜单item对象 */
      item: RankItemProps;
      /** 显示数据的label */
      unit?: string;
      className?: string;
      avatarHolder?: string;
      nameHolder?: string;
      valueHolder?: string;
      children?: React.ReactChild;
      divAttr?: HTMLAttributes<HTMLDivElement>;
      styles?: any;
  };
  export function RankItem(props: RankItemType): JSX.Element | null;
  export default RankItem;

}
declare module 'ge_components/@base/RankItem/interface' {
  /// <reference types="react" />
  export type RankItemProps<ItemProps = {
      [x: string]: any;
  }> = {
      /** 榜单item对象 */
      item: ItemProps;
      styles?: StylesProps & {
          /** 最外层标签 */
          item?: string;
          /** item下的header标签 */
          header?: string;
          avatar?: string;
          /** 头像中的img标签 */
          img?: string;
          /** item下的content标签 */
          content?: string;
          /** 昵称或名称 */
          name?: string;
          /** 贵族or图标 */
          noble?: string;
          /** 值 */
          value?: string;
          /** 名次 */
          place?: string;
          /** 高危样式 */
          danger?: string;
      };
      /** 显示数据的label */
      unit?: string;
      className?: string;
      avatarHolder?: string;
      nameHolder?: string;
      children?: React.ReactChild;
  } & React.HTMLAttributes<HTMLDivElement>;

}
declare module 'ge_components/@base/RewardItem' {
  export function RewardItem({ item, styles, className }: {
      item: any;
      styles: any;
      className: any;
  }): JSX.Element;
  export namespace RewardItem {
      namespace propTypes {
          const styles: PropTypes.Requireable<object>;
          const item: PropTypes.Validator<object>;
          const className: PropTypes.Requireable<string>;
      }
  }
  var _default: React.FC<any>;
  export default _default;
  import PropTypes from "prop-types";
  import React from "react";

}
declare module 'ge_components/@base/RouteTransition' {
  import React from 'react';
  import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
  import './index.scss';
  type RouteTransitionType = Partial<CSSTransitionProps> & {
      children: React.ReactNode;
  };
  export const RouteTransition: (props: RouteTransitionType) => JSX.Element;
  export default RouteTransition;

}
declare module 'ge_components/@base/SentryWrapper' {
  import { ErrorBoundaryPropsWithFallback, FallbackProps } from 'react-error-boundary';
  import React from 'react';
  import { Scope } from '@sentry/browser';
  export type SentryWrapperType = {
      /** 抛出异常后的handler，一般可用于处理抛出错误后的toast或者modal弹出 */
      errorHandler?: (props: {
          error: Error;
          info: {
              componentStack: string;
          };
          eventId: string;
      }) => void;
      /** 错误时替换的UI组件 */
      errorRender?: (props: FallbackProps & {
          eventId: string;
      }) => any;
      /** 需要上报的额外字段 */
      extra?: Scope['_extra'];
      /** 静默上报，不阻止错误后UI继续渲染，您仍可指定onError做其他处理 */
      silent?: boolean;
  } & Partial<ErrorBoundaryPropsWithFallback> & {
      children?: any;
  };
  export class SentrySilentWrapper extends React.Component<SentryWrapperType> {
      componentDidCatch(error: any, errorInfo: any): void;
      render(): any;
  }
  export const SentryWrapper: (props: SentryWrapperType) => JSX.Element;
  export default SentryWrapper;

}
declare module 'ge_components/@base/SwipeList/SwipeList' {
  import React from 'react';
  import PropTypes from 'prop-types';
  import { SwipeListProps, SwipeSlideProps } from 'ge_components/@base/SwipeList/interface';
  function SwipeList({ children, styles }: SwipeListProps): JSX.Element;
  namespace SwipeList {
      var propTypes: {
          children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
          styles: PropTypes.Requireable<object>;
      };
  }
  namespace SwipeList {
      let Slide: React.FunctionComponent<SwipeSlideProps>;
  }
  export default SwipeList;

}
declare module 'ge_components/@base/SwipeList/SwipeSlide' {
  import React from 'react';
  import { SwipeSlideProps } from 'ge_components/@base/SwipeList/interface';
  const SwipeSlide: React.FunctionComponent<SwipeSlideProps>;
  export default SwipeSlide;

}
declare module 'ge_components/@base/SwipeList' {
  import SwipeList from 'ge_components/@base/SwipeList/SwipeList';
  import SwipeSlide from 'ge_components/@base/SwipeList/SwipeSlide';
  export default SwipeList;
  export { SwipeSlide };

}
declare module 'ge_components/@base/SwipeList/interface' {
  /// <reference types="react" />
  export interface SwipeListProps {
      children: React.ReactNode;
      styles?: StylesProps;
  }
  export interface SwipeSlideProps {
      children?: React.ReactNode;
      styles?: StylesProps;
  }

}
declare module 'ge_components/@base/TabNav/TabNav' {
  import React from 'react';
  import { TabNavProps, TabNavItemProps } from 'ge_components/@base/TabNav/interface';
  function TabNav({ className, children, styles }: TabNavProps): JSX.Element;
  namespace TabNav {
      let Item: React.FunctionComponent<TabNavItemProps>;
  }
  export default TabNav;

}
declare module 'ge_components/@base/TabNav/TabNavItem' {
  import { TabNavItemProps } from 'ge_components/@base/TabNav/interface';
  function TabNavItem({ onChange, active, children, styles, item }: TabNavItemProps): JSX.Element;
  export default TabNavItem;

}
declare module 'ge_components/@base/TabNav' {
  import TabNav from 'ge_components/@base/TabNav/TabNav';
  import TabNavItem from 'ge_components/@base/TabNav/TabNavItem';
  export default TabNav;
  export { TabNav, TabNavItem };

}
declare module 'ge_components/@base/TabNav/interface' {
  /// <reference types="react" />
  export interface TabNavProps {
      className?: string;
      children: React.ReactNode;
      /** cssmodules对象，没有的话使用全局模式 */
      styles?: StylesProps;
  }
  interface Evt {
      [x: string]: any;
  }
  export interface ChangeFunc {
      (evt: Evt, value: string | number): void;
  }
  export interface TabItemType {
      /** 作为key使用 */
      value: string | number;
      /** 作为导航的节点插槽 */
      name?: React.ReactChild;
      [propName: string]: any;
  }
  export interface TabNavItemProps {
      /** 导航变化的事件 */
      onChange?: (value: any, item: TabItemType) => void;
      /** 当前激活tab的value值 */
      active?: string | number;
      /** 当前激活tab的内容 */
      children?: React.ReactNode;
      /** cssmodules对象，没有的话使用全局模式 */
      styles?: StylesProps;
      /** 见ItemType */
      item: TabItemType;
  }
  export {};

}
declare module 'ge_components/@base' {
  export * from 'ge_components/@base/Avatar';
  export * from 'ge_components/@base/Button';
  export * from 'ge_components/@base/CounterDisplay';
  export * from 'ge_components/@base/DataContainer';
  export * from 'ge_components/@base/Fetch';
  export * from 'ge_components/@base/Modal';
  export * from 'ge_components/@base/Page';
  export * from 'ge_components/@base/Pagination';
  export * from 'ge_components/@base/RankItem';
  export * from 'ge_components/@base/RewardItem';
  export * from 'ge_components/@base/RouteTransition';
  export * from 'ge_components/@base/SentryWrapper';
  export * from 'ge_components/@base/SwipeList';
  export * from 'ge_components/@base/TabNav';

}
declare module 'ge_components/@hoc/compose' {
  export const compose: (fcArr: Function[]) => Function;

}
declare module 'ge_components/@hoc' {
  export { default as withFetch } from 'ge_components/@hoc/withFetch';
  export { withStyles } from 'ge_components/@hoc/withStyles';

}
declare module 'ge_components/@hoc/withClassName' {
  import PropTypes from 'prop-types';
  type withClassNameProps = {
      [x: string]: any;
  };
  type Props = {
      defaultClassName?: string;
  };
  const withClassName: ({ defaultClassName }: Props) => (WrappedComponent: any) => {
      ({ className, ...props }: withClassNameProps): JSX.Element;
      propTypes: {
          className: PropTypes.Requireable<string>;
      };
  };
  export default withClassName;

}
declare module 'ge_components/@hoc/withFetch' {
  import React from 'react';
  import { FetchProps, FetchState } from '@/@base/Fetch/interface';
  const withFetch: <T extends object, P = any>(fetchProps: FetchProps) => (WrappedComponent: React.FC<T & FetchState<P>>) => React.FC<T & Partial<FetchProps<any>>>;
  export default withFetch;

}
declare module 'ge_components/@hoc/withStyles' {
  import React from 'react';
  export const mergeStyles: (styles: any, stylesProp: any) => any;
  export const withStyles: <P extends {
      styles?: object | undefined;
  } = any>(stylesProp: object) => (WrappedComponent: React.FC<P>) => React.FC<P & {
      assign?: boolean | undefined;
  }>;
  export default withStyles;

}
declare module 'ge_components/@hooks' {
  export { default as useInterval } from 'ge_components/@hooks/useInterval';
  export { default as useScript } from 'ge_components/@hooks/useScript';
  export { default as useTypeDateChange } from 'ge_components/@hooks/useTypeDateChange';
  export { useTab } from 'ge_components/@hooks/useTab';
  export { useCountdown } from 'ge_components/@hooks/useCountdown';
  export type { useTabType } from 'ge_components/@hooks/useTab';

}
declare module 'ge_components/@hooks/useCountdown' {
  export const useCountdown: (delay?: number, step?: number) => {
      count: number;
      startPool: () => void;
      isRun: boolean;
      reset: (delay: number) => void;
      stop: () => void;
  };

}
declare module 'ge_components/@hooks/useInterval' {
  /**
   * React Hooks 的 time interval
   * @param {() => void} callback 回调函数
   * @param {(number | null)} delay 延迟时间
   */
  export function useInterval(callback: () => void, delay: number | null): void;
  export default useInterval;

}
declare module 'ge_components/@hooks/usePagination' {
  export const usePagination: <T>(props: {
      list: T[];
      initial?: number | undefined;
      each?: number | undefined;
      loop?: boolean | undefined;
  }) => {
      current: T[];
      index: number;
      goByStep: (step?: number) => void;
      curList: T[];
  };

}
declare module 'ge_components/@hooks/useScript' {
  type useScriptType = {
      /** 外部脚本链接 */
      url: string;
      /** 加载完成的回调 */
      callback?: GlobalEventHandlers['onload'];
  };
  const useScript: ({ url, callback }: useScriptType) => void;
  export default useScript;

}
declare module 'ge_components/@hooks/useTab' {
  import React from 'react';
  import { TabNavItemProps, TabNavProps } from '@/@base/TabNav/interface';
  export type useTabType = {
      /** value为确定激活态的唯一值，因此只能是string或number */
      list: Array<{
          name: any;
          value: string | number;
          [x: string]: any;
      }>;
      initialIndex?: number;
      styles?: {
          tab?: string;
          list?: string;
          item?: string;
      } | {};
  };
  export const useTab: (props: useTabType) => {
      Tab: React.FC<Partial<TabNavProps & TabNavItemProps>>;
      value: string | number;
      item: {
          [x: string]: any;
          name: any;
          value: string | number;
      };
  };
  export default useTab;

}
declare module 'ge_components/@hooks/useTypeDateChange' {
  function _default([OrnDateChange]: [any]): (props: any) => {
      type: string;
      date: undefined;
      TypeDateChangeCpt: JSX.Element;
  } | {
      type: string;
      TypeDateChangeCpt: JSX.Element;
      date?: undefined;
  };
  export default _default;

}
declare module 'ge_components/@hooks/useWindowSize' {
  export function useWindowSize(): {
      width: number;
      height: number;
  };

}
declare module 'ge_components/@mobile/Img' {
  import { ImgHTMLAttributes } from 'react';
  export interface Props extends ImgHTMLAttributes<Element> {
      onLoaded?: (obj: {
          width: string;
          height: string;
      }) => void;
      remBase?: number;
  }
  const Img: (props: Props) => JSX.Element;
  export default Img;

}
declare module 'ge_components/@mobile/Toast' {
  import { NotificationInstance, NotificationProps } from 'rc-notification/lib/Notification';
  export type ToastInstance = NotificationInstance;
  export type ToastProps = NotificationProps;
  export type ToastMethod = (content: any, duration?: number, onClose?: Function) => Promise<void>;
  export class Toast {
      instance: ToastInstance | null;
      prefixCls: string;
      constructor(props?: ToastProps);
      init(props: ToastProps): void;
      getMessageInstance(props: ToastProps): void;
      toast: ToastMethod;
      destroy(): void;
  }
  export default Toast;
  export type $toastType = ToastMethod & {
      loading: Function;
      hide: Function;
      bottom: ToastMethod;
  };
  export const $toast: $toastType;

}
declare module 'ge_components/@mobile' {
  export { default as Img } from 'ge_components/@mobile/Img';
  export { Toast, $toast } from 'ge_components/@mobile/Toast';

}
declare module 'ge_components' {
  export * from 'ge_components/@act';
  export * from 'ge_components/@base';
  export * from 'ge_components/@hoc';
  export * from 'ge_components/@hooks';
  export * from 'ge_components/@mobile';
  export * from 'ge_components/utils';

}
declare module 'ge_components/utils/fr-auth' {
  export function getCookie(name: any): string;
  export function getCurrentUrl(): string;
  export function isLogin(): boolean;
  export function showLoginBox(url: any): void;
  export function logout(url: any): void;
  export function getUid(): string | 0;
  export function getUserName(): string;

}
declare module 'ge_components/utils/helper' {
  export const compose: (hocPipe: Function[]) => Function;
  export const getStylesFunc: (cptName: string, styles?: Record<string, string> | undefined) => (className: string) => string;
  export const getParam: (key: string, url?: string) => string;
  export const genStyles: (prefix?: string, defaultStyles?: {
      [className: string]: string;
  }) => {
      [className: string]: string;
  };

}
declare module 'ge_components/utils' {
  export * from 'ge_components/utils/request';
  export * from 'ge_components/utils/helper';

}
declare module 'ge_components/utils/request' {
  import fetchJsonp from 'fetch-jsonp';
  export interface FrResponse<T = any> {
      data?: T;
      err?: any;
  }
  export interface FrPromise<T = any> extends Promise<FrResponse<T>> {
  }
  /**
   * Requests a URL, returning a promise.
   *
   * @param  {string} url       The URL we want to request
   * @param  {object} [options] The options we want to pass to "fetch"
   * @return {object}           An object containing either "data" or "err"
   */
  export type FrRequest = <T = any>(url: string, options?: {
      jsonp?: boolean;
      query?: object;
  } & (fetchJsonp.Options | RequestInit)) => FrPromise<T>;
  export const request: FrRequest;
  export default request;

}
declare module '@gfe/ge-components/stories/@act/CircleProgress/index.stories' {
  const _default: {
      title: string;
      component: ({ r, percent, strokeWidth, borderOffset, visible, edgeSlot, centerSlot, centerStyle, edgeStyle: edgeStyleProps, ...otherProps }: import("@/@act/CircleProgress").CircleProgressType) => JSX.Element;
  };
  export default _default;
  export const Docs: () => JSX.Element;
  export const Demo: {
      (): JSX.Element;
      storyName: string;
  };

}
declare module '@gfe/ge-components/stories/@act/Icon/index.stories' {
  import { Noble, LegionIcon, TaskGrade } from '@/@act/Icon';
  const _default: {
      title: string;
      subcomponents: {
          Noble: typeof Noble;
          LegionIcon: typeof LegionIcon;
          TaskGrade: typeof TaskGrade;
      };
  };
  export default _default;
  export const NobleIcon: {
      (): JSX.Element;
      storyName: string;
      parameters: {
          node: string;
      };
  };
  export const JunTuanIcon: {
      (): JSX.Element;
      storyName: string;
      parameters: {
          node: string;
      };
  };
  export const LevelIcon: {
      (): JSX.Element;
      storyName: string;
      parameters: {
          node: string;
      };
  };

}
declare module '@gfe/ge-components/stories/@act/PropsIcon/index.stories' {
  const _default: {
      title: string;
      component: {
          (props: import("@/@act/PropsIcon").PropsIconType): JSX.Element;
          defaultProps: {
              showTip: boolean;
              propsId: number;
              autoLoadTip: boolean;
          };
      };
  };
  export default _default;
  export const Demo: {
      (): JSX.Element;
      title: string;
  };
  export const PropsIconDemo: {
      (): JSX.Element;
      title: string;
      parameters: {
          docs: {
              description: {
                  story: string;
              };
          };
      };
  };
  export const Tippy: {
      (): JSX.Element;
      title: string;
  };

}
declare module '@gfe/ge-components/stories/@act/RankList' {
  import React from 'react';
  import { RankItemProps } from '@/@base/RankItem';
  type RankListType = {
      list: RankItemProps[];
      styles?: any;
      className?: string;
      unit?: string;
  };
  export const RankList: (props: RankListType) => JSX.Element;
  export const RankList1: React.FC<RankListType & {
      assign?: boolean | undefined;
  }>;
  export const RankList2: React.FC<RankListType & {
      assign?: boolean | undefined;
  }>;
  export {};

}
declare module '@gfe/ge-components/stories/@act/RankList/index.stories' {
  const _default: {
      title: string;
      component: (props: {
          list: import("@/@base").RankItemProps[];
          styles?: any;
          className?: string | undefined;
          unit?: string | undefined;
      }) => JSX.Element;
  };
  export default _default;
  export const Docs: () => JSX.Element;
  export const Demo: {
      (): JSX.Element;
      storyName: string;
      parameters: {
          docs: {
              description: {
                  story: string;
              };
          };
      };
  };

}
declare module '@gfe/ge-components/stories/@act/RankList/utils' {
  export const genStyles: (cptName: string, styles?: Record<string, string> | undefined) => (className: string) => string;

}
declare module '@gfe/ge-components/stories/@act/SideBar/index.stories' {
  import Sidebar from '@/@act/Sidebar';
  const _default: {
      title: string;
      component: typeof Sidebar;
  };
  export default _default;
  export const Docs: () => void;
  export const Demo: {
      (): JSX.Element;
      storyName: string;
      parameters: {
          docs: {
              description: {
                  story: string;
              };
          };
      };
  };

}
declare module '@gfe/ge-components/stories/@act/Subscribe/index.stories' {
  import Subscribe from '@/@act/Subscribe';
  const _default: {
      title: string;
      component: typeof Subscribe;
  };
  export default _default;
  export const Demo: {
      (): JSX.Element;
      title: string;
  };
  export const NoCancel: {
      (): JSX.Element;
      storyName: string;
  };
  export const CanCancel: {
      (): JSX.Element;
      storyName: string;
  };

}
declare module '@gfe/ge-components/stories/@act/TopLight/index.stories' {
  const _default: {
      title: string;
      subcomponents: {
          TopLightButton: ({ current, begin, forwardRef, urlList, propsName }: import("@/@act/TopLight").TopLightButtonType) => JSX.Element;
      };
  };
  export default _default;
  export const Demo: {
      (): JSX.Element;
      title: string;
  };
  export const TopLightDemo: {
      (): JSX.Element;
      title: string;
      parameters: {
          docs: {
              description: {
                  story: string;
              };
          };
      };
  };

}
declare module '@gfe/ge-components/stories/@doc/addon.stories' {

}
declare module '@gfe/ge-components/stories/@doc/how.stories' {
  const _default: {
      title: string;
  };
  export default _default;
  export const Docs: {
      (): JSX.Element;
      storyName: string;
  };

}
declare module '@gfe/ge-components/stories/@doc/news.stories' {

}
declare module '@gfe/ge-components/stories/@doc/readme.stories' {
  const _default: {
      title: string;
  };
  export default _default;
  export const Docs: () => JSX.Element;

}
declare module '@gfe/ge-components/stories/@hoc/usePagination.stories' {
  const _default: {
      title: string;
      component: <T>(props: {
          list: T[];
          initial?: number | undefined;
          each?: number | undefined;
          loop?: boolean | undefined;
      }) => {
          current: T[];
          index: number;
          goByStep: (step?: number) => void;
          curList: T[];
      };
  };
  export default _default;
  export const Docs: () => JSX.Element;
  export const Base: {
      (): JSX.Element;
      storyName: string;
      parameters: {
          docs: {
              storyDescription: string;
          };
      };
  };

}
declare module '@gfe/ge-components/stories/@hoc/withFetch.stories' {
  import React from 'react';
  import { useFetch } from '@/@base/Fetch';
  const _default: {
      title: string;
      component: <T extends object, P = any>(fetchProps: import("ge_components/@base/Fetch/interface").FetchProps<any>) => (WrappedComponent: React.FC<T & import("../../src/@base/Fetch/interface").FetchState<P>>) => React.FC<T & Partial<import("../../src/@base/Fetch/interface").FetchProps<any>>>;
      subcomponents: {
          Fetch: (props: import("ge_components/@base/Fetch/interface").FetchProps<any>) => JSX.Element;
          useFetch: typeof useFetch;
      };
      parameters: {
          docs: {
              description: {
                  component: string;
              };
          };
      };
  };
  export default _default;
  export const Docs: {
      (): JSX.Element;
      storyName: string;
  };
  export const Demo1: {
      (): JSX.Element;
      storyName: string;
      parameters: {
          docs: {
              description: {
                  story: string;
              };
          };
      };
  };

}
declare module '@gfe/ge-components/stories/@hoc/withStyles.stories' {
  import React from 'react';
  const _default: {
      title: string;
      component: <P extends {
          styles?: object | undefined;
      } = any>(stylesProp: object) => (WrappedComponent: React.FC<P>) => React.FC<P & {
          assign?: boolean | undefined;
      }>;
  };
  export default _default;
  export const Docs: () => JSX.Element;
  export const OverRide: {
      (): JSX.Element;
      storyName: string;
      parameters: {
          docs: {
              storyDescription: string;
          };
      };
  };
  export const AssginParam: {
      (): JSX.Element;
      storyName: string;
  };

}
declare module '@gfe/ge-components/stories/@hooks/useCountdown/index.stories' {
  const _default: {
      title: string;
      component: (delay?: number, step?: number) => {
          count: number;
          startPool: () => void;
          isRun: boolean;
          reset: (delay: number) => void;
          stop: () => void;
      };
  };
  export default _default;
  export const Docs: () => JSX.Element;
  export const Demo: {
      (): JSX.Element;
      storyName: string;
  };

}
declare module '@gfe/ge-components/stories/@hooks/useFetch/useFetch.stories' {

}
declare module '@gfe/ge-components/stories/@hooks/useInterval/Prop' {
  type UseIntervalType = {
      callback: () => void;
      delay: number | null;
  };
  export const UseInterval: (_props: UseIntervalType) => null;
  export {};

}
declare module '@gfe/ge-components/stories/@hooks/useInterval/useInterval.stories' {
  const _default: {
      title: string;
      component: (_props: {
          callback: () => void;
          delay: number | null;
      }) => null;
  };
  export default _default;
  export const Docs: () => JSX.Element;
  export const Add: {
      (): JSX.Element;
      storyName: string;
  };
  export const Delay: {
      (): JSX.Element;
      storyName: string;
  };
  export const Dynamic: {
      (): JSX.Element;
      storyName: string;
  };

}
declare module '@gfe/ge-components/stories/@hooks/useScript/useScript.stories' {
  const _default: {
      title: string;
      component: ({ url, callback }: {
          url: string;
          callback?: ((this: GlobalEventHandlers, ev: Event) => any) | null | undefined;
      }) => void;
  };
  export default _default;
  export const Docs: () => JSX.Element;
  export const Demo: {
      (): JSX.Element;
      storyName: string;
  };

}
declare module '@gfe/ge-components/stories/@hooks/useTab/useTab.stories' {
  import React from 'react';
  import TabNav, { TabNavItem } from '@/@base/TabNav';
  const _default: {
      title: string;
      component: (props: import("@/@hooks/useTab").useTabType) => {
          Tab: React.FC<Partial<import("ge_components/@base/TabNav/interface").TabNavProps & import("../../../src/@base/TabNav/interface").TabNavItemProps>>;
          value: string | number;
          item: {
              [x: string]: any;
              name: any;
              value: string | number;
          };
      };
      subcomponents: {
          TabNav: typeof TabNav;
          TabNavItem: typeof TabNavItem;
      };
  };
  export default _default;
  export const Docs: () => JSX.Element;
  export const Demo: {
      (): JSX.Element;
      storyName: string;
  };

}
declare module '@gfe/ge-components/stories/@mobile/Toast/ToastProps' {
  type ToastStoryProps = {
      /** toast内容，如编译工具支持，可传入jsx */
      content: any;
      /** 停留时间，单位秒，默认值3秒*/
      duration?: number;
      /** 消失后的回调，除了声明`onClose`，你还可以使用`promise.then()`或者`async/await` */
      onClose?: Function;
  };
  export const ToastPropsStory: (_props: ToastStoryProps) => null;
  export {};

}
declare module '@gfe/ge-components/stories/@mobile/Toast/index.stories' {
  const _default: {
      title: string;
      component: (_props: {
          content: any;
          duration?: number | undefined;
          onClose?: Function | undefined;
      }) => null;
  };
  export default _default;
  export const Docs: () => globalThis.JSX.Element;
  export const Basic: () => globalThis.JSX.Element;
  export const Then: {
      (): globalThis.JSX.Element;
      storyName: string;
  };
  export const AsyncDemo: {
      (): globalThis.JSX.Element;
      storyName: string;
  };
  export const Loading: {
      (): globalThis.JSX.Element;
      storyName: string;
      parameters: {
          docs: {
              description: {
                  story: string;
              };
          };
      };
  };
  export const Bottom: {
      (): globalThis.JSX.Element;
      storyName: string;
  };
  export const Custom: {
      (): globalThis.JSX.Element;
      storyName: string;
      parameters: {
          docs: {
              description: {
                  story: string;
              };
          };
      };
  };
  export const JSX: {
      (): globalThis.JSX.Element;
      storyName: string;
  };

}
declare module '@gfe/ge-components/stories/Avatar/index.stories' {
  import { AvatarProps } from '@/@base/Avatar';
  const _default: {
      title: string;
      component: ({ imgSrc, error, onError, children, className, styles, imgAttr }: AvatarProps) => JSX.Element;
      parameters: {
          docs: {
              description: {
                  component: string;
              };
          };
      };
  };
  export default _default;
  export const Docs: () => JSX.Element;
  export const Error: {
      (): JSX.Element;
      storyName: string;
  };
  export const Success: {
      (): JSX.Element;
      storyName: string;
  };
  export const Slot: {
      (): JSX.Element;
      storyName: string;
      parameters: {
          docs: {
              description: {
                  story: string;
              };
          };
      };
  };
  export const OnError: {
      (): JSX.Element;
      storyName: string;
  };

}
declare module '@gfe/ge-components/stories/Button/index.stories' {
  namespace _default {
      export const title: string;
      export namespace parameters {
          namespace docs {
              namespace description {
                  const component: string;
              }
          }
      }
      export { Button as component };
  }
  export default _default;
  export function Docs(): JSX.Element;
  export function Btn(props: any): JSX.Element;
  export function Loading(): JSX.Element;
  export namespace Loading {
      export const storyName: string;
      export namespace parameters_1 {
          export namespace docs_1 {
              export namespace description_1 {
                  const story: string;
              }
              export { description_1 as description };
          }
          export { docs_1 as docs };
      }
      export { parameters_1 as parameters };
  }
  export function OnClick(): JSX.Element;
  export namespace OnClick {
      const storyName_1: string;
      export { storyName_1 as storyName };
  }
  export function Disabled(): JSX.Element;
  export namespace Disabled {
      const storyName_2: string;
      export { storyName_2 as storyName };
  }
  export function DomAttr(): JSX.Element;
  export namespace DomAttr {
      const storyName_3: string;
      export { storyName_3 as storyName };
  }
  import { Button } from "@/@base/Button";

}
declare module '@gfe/ge-components/stories/DataContainer/index.stories' {
  import DataContainer from '@/@base/DataContainer';
  const _default: {
      title: string;
      component: typeof DataContainer;
  };
  export default _default;
  export const Docs: () => JSX.Element;
  export const NoData: {
      (): JSX.Element;
      storyName: string;
  };
  export const Normal: {
      (): JSX.Element;
      storyName: string;
  };

}
declare module '@gfe/ge-components/stories/DateChange/index.stories' {
  const _default: {
      title: string;
      component: ({ format, styles, ...props }: import("@/@base/DateChange").DateChangeProps) => JSX.Element;
      parameters: {
          docs: {
              description: {
                  component: string;
              };
          };
      };
  };
  export default _default;
  export const Docs: () => JSX.Element;
  export const DefaultUse: {
      (): JSX.Element;
      storyName: string;
  };

}
declare module '@gfe/ge-components/stories/Fetch/api' {
  namespace _default {
      export { subscribe_compere };
      export { unsubscribe_compere };
      export { test_act_api };
  }
  export default _default;
  function subscribe_compere(query: any): any;
  function unsubscribe_compere(query: any): any;
  function test_act_api(query: any): any;

}
declare module '@gfe/ge-components/stories/Fetch/index.stories' {
  const _default: {
      title: string;
      component: (props: import("ge_components/@base/Fetch/interface").FetchProps<any>) => JSX.Element;
  };
  export default _default;
  export const Docs: () => void;
  export const Manual: {
      (): JSX.Element;
      storyName: string;
  };
  export const WithFetchMode: {
      (): JSX.Element;
      storyName: string;
  };
  export const ChangeQuery: {
      (): JSX.Element;
      storyName: string;
  };
  export const validateOrError: {
      (): JSX.Element;
      storyName: string;
  };
  export const SimpleCache: {
      (): JSX.Element;
      storyName: string;
  };
  export const changeQueryWithFetch: {
      (): JSX.Element;
      storyName: string;
  };

}
declare module '@gfe/ge-components/stories/Fetch/utils' {
  type FtsValidate = (res: any) => string | boolean;
  const ftsValidate: FtsValidate;

}
declare module '@gfe/ge-components/stories/Modal/index.stories' {
  const _default: {
      title: string;
      component: ({ destroy, prefixCls, title, afterClose, ...restProps }: import("@/@base//Modal").ModalProps) => JSX.Element;
      subcomponents: {
          DefaultModal: (props: import("@/@act/DefaultModal").DefaultModalProps) => JSX.Element;
          Dialog: (props: import("rc-dialog/lib/IDialogPropTypes").default) => JSX.Element;
      };
  };
  export default _default;
  export const Docs: () => JSX.Element;
  export const DefaultModalMode: {
      (): JSX.Element;
      storyName: string;
      parameters: {
          docs: {
              description: {
                  story: string;
              };
          };
      };
  };
  export const Functionally: {
      (): JSX.Element;
      storyName: string;
      parameters: {
          docs: {
              description: {
                  story: string;
              };
          };
      };
  };
  export const Inline: {
      (): JSX.Element;
      storyName: string;
      parameters: {
          docs: {
              description: {
                  story: string;
              };
          };
      };
  };

}
declare module '@gfe/ge-components/stories/Pagination/index.stories' {
  const _default: {
      title: string;
      component: (props: import("@/@base/Pagination").PaginationProps) => JSX.Element | null;
  };
  export default _default;
  export const Docs: () => void;
  export const Demo: {
      (): JSX.Element;
      storyName: string;
  };

}
declare module '@gfe/ge-components/stories/RankItem/index.stories' {
  import RankItem from '@/@base/RankItem';
  const _default: {
      title: string;
      component: typeof RankItem;
  };
  export default _default;
  export const Docs: () => void;
  export const Normal: {
      (): JSX.Element;
      storyName: string;
  };
  export const TopThree: {
      (): JSX.Element;
      storyName: string;
  };

}
declare module '@gfe/ge-components/stories/RouteTransition/Pages/AboutPage' {
  export default class AboutPage extends React.PureComponent<any, any, any> {
      constructor(props: any);
      constructor(props: any, context: any);
      onBack: () => void;
  }
  import React from "react";

}
declare module '@gfe/ge-components/stories/RouteTransition/Pages/DetailPage' {
  export default class DetailPage extends React.PureComponent<any, any, any> {
      constructor(props: any);
      constructor(props: any, context: any);
      onBack: () => void;
  }
  import React from "react";

}
declare module '@gfe/ge-components/stories/RouteTransition/Pages/HomePage' {
  export default class HomePage extends React.PureComponent<any, any, any> {
      constructor(props: any);
      constructor(props: any, context: any);
      goToPage(pathname: any): void;
      goToAboutPage: () => void;
      goToListPage: () => void;
  }
  import React from "react";

}
declare module '@gfe/ge-components/stories/RouteTransition/Pages/ListPage' {
  export default class ListPage extends React.PureComponent<any, any, any> {
      constructor(props: any);
      constructor(props: any, context: any);
      onBack: () => void;
      onClickListItem: () => void;
  }
  import React from "react";

}
declare module '@gfe/ge-components/stories/RouteTransition/Pages' {
  import HomePage from "@gfe/ge-components/stories/RouteTransition/Pages/HomePage";
  import ListPage from "@gfe/ge-components/stories/RouteTransition/Pages/ListPage";
  import AboutPage from "@gfe/ge-components/stories/RouteTransition/Pages/AboutPage";
  import DetailPage from "@gfe/ge-components/stories/RouteTransition/Pages/DetailPage";
  export { HomePage, ListPage, AboutPage, DetailPage };

}
declare module '@gfe/ge-components/stories/RouteTransition/index.stories' {
  import React from 'react';
  const _default: {
      title: string;
      component: (props: Partial<import("react-transition-group/CSSTransition").CSSTransitionProps<undefined>> & {
          children: React.ReactNode;
      }) => JSX.Element;
      parameters: {
          docs: {
              description: {
                  component: string;
              };
          };
      };
  };
  export default _default;
  export const Docs: () => string;
  export const Base: {
      (): JSX.Element;
      storyName: string;
  };

}
declare module '@gfe/ge-components/stories/SentryWrapper/SentryPC' {
  import React from 'react';
  export const SentryPC: React.FC;

}
declare module '@gfe/ge-components/stories/SentryWrapper/index.stories' {
  import { SentryWrapperType } from '@/@base/SentryWrapper';
  const _default: {
      title: string;
      component: (props: SentryWrapperType) => JSX.Element;
      parameters: {
          docs: {
              description: {
                  component: string;
              };
          };
      };
  };
  export default _default;
  export const Docs: {
      (): JSX.Element;
      storyName: string;
  };
  export const Base: {
      ({ index }: {
          index?: number | undefined;
      }): JSX.Element;
      storyName: string;
      parameters: {
          docs: {
              description: {
                  story: string;
              };
          };
      };
  };
  export const OnErrorDemo: {
      (): JSX.Element;
      storyName: string;
      parameters: {
          docs: {
              description: {
                  story: string;
              };
          };
      };
  };

}
declare module '@gfe/ge-components/stories/SwipeList/Footer' {

}
declare module '@gfe/ge-components/stories/SwipeList/index.stories' {
  export const List: {
      (): JSX.Element;
      title: string;
  };

}
declare module '@gfe/ge-components/stories/TabChangeWithDate/index.stories' {
  import TabChangeWithDate from '@/@act/TabChangeWithDate';
  const _default: {
      title: string;
      component: typeof TabChangeWithDate;
      parameters: {
          docs: {};
      };
  };
  export default _default;
  export const Docs: () => JSX.Element;
  /** 日期切换组件 */
  export const UseWithComponent: {
      (): JSX.Element;
      storyName: string;
  };

}
declare module '@gfe/ge-components/stories/TabNav/index.stories' {
  import TabNav, { TabNavItem } from '@/@base/TabNav';
  const _default: {
      title: string;
      subcomponents: {
          TabNavItem: typeof TabNavItem;
          TabItemType: (_props: any) => null;
          TabNav: typeof TabNav;
      };
  };
  export default _default;
  export const Docs: () => void;
  export const Nav: {
      (): JSX.Element;
      storyName: string;
  };
  export const Stage: {
      (): JSX.Element;
      storyName: string;
  };

}
declare module '@gfe/ge-components/stories/TabNav/type.stories' {
  export const TabItemType: (_props: any) => null;

}
declare module '@gfe/ge-components/stories/utils/CodePreview' {
  import React from 'react';
  import { Canvas } from '@storybook/addon-docs/blocks';
  const CodePreview: React.FC<typeof Canvas['defaultProps'] & {
      src?: any;
      lang?: string;
  }>;
  export default CodePreview;

}
declare module '@gfe/ge-components/stories/utils/api' {
  export const API_FTS = "https://fts-test.yy.com";
  export const subscribe_compere: (query: any) => import("@/utils/request").FrPromise<any>;
  export const unsubscribe_compere: (query: any) => import("@/utils/request").FrPromise<any>;
  export const activity_status: (query: any) => import("@/utils/request").FrPromise<any>;
  export const rank_total_api: (query: any) => import("@/utils/request").FrPromise<any>;
  export const rank_daily_api: (query: any) => import("@/utils/request").FrPromise<any>;
  export const getUserInfo: (uid?: number | undefined) => import("@/utils/request").FrPromise<any>;
  const _default: {
      subscribe_compere: (query: any) => import("@/utils/request").FrPromise<any>;
      unsubscribe_compere: (query: any) => import("@/utils/request").FrPromise<any>;
      activity_status: (query: any) => import("@/utils/request").FrPromise<any>;
      rank_total_api: (query: any) => import("@/utils/request").FrPromise<any>;
      rank_daily_api: (query: any) => import("@/utils/request").FrPromise<any>;
      getUserInfo: (uid?: number | undefined) => import("@/utils/request").FrPromise<any>;
  };
  export default _default;

}
declare module '@gfe/ge-components/stories/utils/validate' {
  export function ftsValidate(res: any): string | boolean;
  export function ftsListValidate(res: any): string | boolean;

}
declare module '@gfe/ge-components' {
  import main = require('@gfe/ge-components/index.ts');
  export = main;
}