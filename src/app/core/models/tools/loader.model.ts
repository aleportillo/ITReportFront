export interface ILoader {
    search          : boolean;
    createReport    : boolean;
    getUserReports  : boolean;
    getActiveReports: boolean;
    acceptReport    : boolean;
}

export class Loader implements ILoader {
	static readonly clean = Object.freeze( new Loader() );
    [key: string]      : any;
    search           = false;
    createReport     = false;
    getUserReports   = false;
    getActiveReports = false;
    acceptReport     = false;
}
