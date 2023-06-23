let navigator;

function setNavigator(nav) {
  navigator = nav;
}

function navigate(routeName, params) {
  navigator.navigate(routeName, params);
}

export default {
  setNavigator,
  navigate,
};
