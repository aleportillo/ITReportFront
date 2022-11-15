export interface ILoader {
    search            : boolean;
    createReport      : boolean;
    getUserReports    : boolean;
    getActiveReports  : boolean;
    getNewReports     : boolean;
    acceptReport      : boolean;
    rejectReport      : boolean;
    saveProfile       : boolean;
    getProfile        : boolean;
    login             : boolean;
    saveRoom          : boolean;
    saveComponent     : boolean;
    saveComputer      : boolean;
    getInventoryItems : boolean;
    getRooms          : boolean;
    getComputers      : boolean;
    getComponents     : boolean;
}

export class Loader implements ILoader {
	static readonly clean = Object.freeze( new Loader() );
    [key: string]      : any;
    search            = false;
    createReport      = false;
    getUserReports    = false;
    getActiveReports  = false;
    getNewReports     = false;
    acceptReport      = false;
    rejectReport      = false;
    saveProfile       = false;
    getProfile        = false;
    login             = false;
    saveRoom          = false;
    saveComponent     = false;
    saveComputer      = false;
    getInventoryItems = false;
    getRooms          = false;
    getComputers      = false;
    getComponents     = false;
}
