'use strict';

import appStore from "../models/app-store.js";

const about = {
  createView(request, response) {
    const viewData = {
      title: "About Minecraft",
      info: appStore.getAppInfo()
    };
  
    response.render("about", viewData);
  },
};

export default about;