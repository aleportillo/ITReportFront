export interface ILoader {
    search          : boolean;
    createReport    : boolean;
    getUserReports  : boolean;
    getActiveReports: boolean;
    getNewReports   : boolean;
    acceptReport    : boolean;
    rejectReport    : boolean;
    saveProfile     : boolean;
    getProfile      : boolean;
    login           : boolean;
}

export class Loader implements ILoader {
	static readonly clean = Object.freeze( new Loader() );
    [key: string]      : any;
    search           = false;
    createReport     = false;
    getUserReports   = false;
    getActiveReports = false;
    getNewReports    = false;
    acceptReport     = false;
    rejectReport     = false;
    saveProfile      = false;
    getProfile       = false;
    login            = false;
}
