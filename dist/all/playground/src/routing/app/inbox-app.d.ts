import { ActivatedRoute, Router } from '@angular/router';
export declare class InboxRecord {
    id: string;
    subject: string;
    content: string;
    email: string;
    firstName: string;
    lastName: string;
    date: string;
    draft: boolean;
    constructor(data?: {
        id: string;
        subject: string;
        content: string;
        email: string;
        firstName: string;
        lastName: string;
        date: string;
        draft?: boolean;
    });
    setData(record: {
        id: string;
        subject: string;
        content: string;
        email: string;
        firstName: string;
        lastName: string;
        date: string;
        draft?: boolean;
    }): void;
}
export declare class DbService {
    getData(): Promise<InboxRecord[]>;
    drafts(): Promise<InboxRecord[]>;
    emails(): Promise<InboxRecord[]>;
    email(id: string): Promise<InboxRecord>;
}
export declare class InboxCmp {
    router: Router;
    private items;
    private ready;
    constructor(router: Router, db: DbService, route: ActivatedRoute);
}
export declare class DraftsCmp {
    private router;
    private items;
    private ready;
    constructor(router: Router, db: DbService);
}
export declare const ROUTER_CONFIG: ({
    path: string;
    pathMatch: string;
    redirectTo: string;
} | {
    path: string;
    component: typeof InboxCmp;
} | {
    path: string;
    component: typeof DraftsCmp;
} | {
    path: string;
    loadChildren: string;
})[];
export declare class InboxApp {
}
