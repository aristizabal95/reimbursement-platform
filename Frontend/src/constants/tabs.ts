import Tab from "../interfaces/Tab";

//URLs de las páginas
export const urlHome = "/";
export const urlMyRequests = "/my-requests";
export const urlNewRequest = "/new-request";

// Nombres de las tabs
export const homeTab = "Home";
export const myRequestsTab = "My Requests";
export const newRequestTab = "New Request";

export const tabs: Tab[] = [
  {
    tabName: homeTab,
    url: urlHome,
  },
  {
    tabName: myRequestsTab,
    url: urlMyRequests,
  },
  {
    tabName: newRequestTab,
    url: urlNewRequest,
  },
];
