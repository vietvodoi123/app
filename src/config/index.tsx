// NAME
const STORE_NAME = "state";

// NETWORK
const NETWORK_CONFIG = {
  HOST: "https://api.mys.tinasoft.com.vn",
  API_BASE_URL: "https://api.mys.tinasoft.com.vn" + "/api/v1",
  BASE_URL: "https://api.mys.tinasoft.com.vn",
  TIMEOUT: 30000,
  RETRY: false,
  DISPLAY_ERROR: true,
  USE_TOKEN: true,
  WITH_METADATA: false,
};

// LAYOUT
const LAYOUT_CONFIG = {
  useSidebar: true,
  useNavbar: true,
  useFooter: true,
  useBottomNavigator: true,
};

// LANGUAGE
const LANGUAGE = {
  DEFAULT: "en",
};

const NOW = { YEAR: 2022, Month: 9 };

export default {
  STORE_NAME,
  NETWORK_CONFIG,
  LAYOUT_CONFIG,
  LANGUAGE,
  NOW,
};
