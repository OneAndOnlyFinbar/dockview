import { IDisposable } from '../../lifecycle';
import { IGroupview } from '../groupview';
import { IGroupAccessor } from '../../dockview';
import { IGroupPanelApi } from '../../api/groupPanelApi';
import { Constructor } from '../../types';
import { PanelInitParameters, IPanel } from '../../panel/types';
import { Event } from '../../events';
import { DockviewApi } from '../../api/component.api';

// group panel parts

export interface HeaderPartInitParameters {
    title: string;
    suppressClosable?: boolean;
}

export interface GroupPanelPartInitParameters
    extends PanelInitParameters,
        HeaderPartInitParameters {
    api: IGroupPanelApi;
    containerApi: DockviewApi;
}

export interface PanelHeaderPart extends IPanel {
    element: HTMLElement;
    init?(parameters: GroupPanelPartInitParameters);
    setVisible(isPanelVisible: boolean, isGroupVisible: boolean): void;
}

export interface PanelContentPart extends IPanel {
    element: HTMLElement;
    setVisible(isPanelVisible: boolean, isGroupVisible: boolean): void;
    init?(parameters: GroupPanelPartInitParameters);
    close?(): Promise<boolean>;
}

// group panel

export interface IGroupPanelInitParameters
    extends PanelInitParameters,
        HeaderPartInitParameters {
    headerPart: PanelHeaderPart;
    contentPart: PanelContentPart;
    containerApi: DockviewApi;
}

export interface IGroupPanel extends IDisposable, IPanel {
    header: PanelHeaderPart;
    content: PanelContentPart;
    group: IGroupview;
    setVisible(isGroupActive: boolean, group: IGroupview): void;
    setDirty(isDirty: boolean): void;
    close?(): Promise<boolean>;
    init?(params: IGroupPanelInitParameters): void;
    onDidStateChange: Event<any>;
}

// watermark component

export interface WatermarkPartInitParameters {
    accessor: IGroupAccessor;
}

export interface WatermarkPart extends IDisposable {
    init?: (params: GroupPanelPartInitParameters) => void;
    setVisible?(visible: boolean, group: IGroupview): void;
    element: HTMLElement;
}

// constructors

export interface PanelHeaderPartConstructor {
    new (): PanelHeaderPart;
}
export interface PanelContentPartConstructor {
    new (): PanelContentPart;
}

export interface WatermarkConstructor extends Constructor<WatermarkPart> {}
