import { useNavigate } from "react-router-dom";
import { urlHome } from "../constants/tabs";

function FactoredLogo() {
  const navigate = useNavigate();
  return (
    <svg
      width="200"
      height="84"
      viewBox="0 0 298 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={() => {
        navigate(urlHome);
      }}
      style={{ cursor: "pointer" }}
    >
      <path
        d="M291.985 20.6448H298V62.9269H292.017V59.8885C291.412 60.4149 291.007 60.8296 290.545 61.1725C285.82 64.785 279.089 63.7404 275.676 58.8518C274.737 57.5041 274.419 55.941 274.252 54.3541C273.79 49.9839 273.775 45.6058 274.252 41.2356C274.65 37.5672 276.416 34.7362 279.869 33.3007C283.6 31.7457 287.228 32.0726 290.482 34.6883C290.935 35.0552 291.389 35.422 291.985 35.9005V20.6368V20.6448ZM279.908 48.0381C280.115 49.633 280.195 51.4672 280.617 53.2217C281.587 57.2649 287.108 58.7482 290.092 55.8294C291.062 54.8804 291.572 53.6284 291.659 52.3604C291.842 49.5852 292.049 46.7781 291.794 44.0188C291.468 40.4381 289.909 38.8432 286.79 38.5481C283.393 38.2291 281.181 39.3217 280.449 42.998C280.139 44.5691 280.091 46.1959 279.9 48.0381H279.908Z"
        fill="#191E3E"
      />
      <path
        d="M99.6303 62.951H93.2975V20.6848H120.172V26.6499C119.83 26.6499 119.488 26.6499 119.154 26.6499C112.98 26.6499 106.806 26.6659 100.633 26.634C99.7973 26.634 99.5985 26.8892 99.6144 27.6866C99.6541 31.1876 99.6303 34.6964 99.6303 38.1974C99.6303 38.4845 99.6541 38.7715 99.6701 39.1464H113.76V44.8563H112.781C108.724 44.8563 104.666 44.8722 100.609 44.8403C99.8451 44.8403 99.6064 45.0317 99.6064 45.8212C99.6382 51.1483 99.6223 56.4755 99.6223 61.8026V62.9589L99.6303 62.951Z"
        fill="#191E3E"
      />
      <path
        d="M135.614 60.3113C133.299 63.4134 130.125 63.4294 126.958 63.2779C124.285 63.1423 121.835 62.3049 119.91 60.2953C117.324 57.5998 116.791 54.4099 117.945 50.9808C119.074 47.6155 121.628 45.7175 125.089 45.3905C128.176 45.1034 131.31 45.223 134.421 45.1672C134.771 45.1672 135.121 45.1672 135.519 45.1672C135.519 43.7318 135.67 42.3442 135.479 41.0044C135.272 39.5291 134.071 38.8193 132.718 38.4844C130.785 37.9979 128.82 38.0617 126.863 38.3648C125.503 38.5801 124.492 39.3217 123.72 40.4701C122.113 39.242 120.578 38.0697 118.979 36.8496C120.148 35.2068 121.636 34.0026 123.466 33.3805C128.032 31.8095 132.599 32.0089 137.038 33.8989C139.918 35.119 141.279 37.5354 141.565 40.5498C141.732 42.3282 141.724 44.1305 141.724 45.9248C141.74 51.2519 141.724 56.5791 141.724 61.9062C141.724 62.2252 141.724 62.5442 141.724 62.927H135.606V60.3113H135.614ZM135.686 50.2232C132.893 50.2232 130.316 50.1754 127.746 50.2471C126.831 50.279 125.884 50.5103 125.025 50.8452C123.832 51.3078 123.203 52.2568 123.187 53.5885C123.171 55.4148 124.349 56.922 126.378 57.3287C128.581 57.7753 130.801 57.7115 133.005 57.2011C134.365 56.8821 135.193 56.0288 135.368 54.6811C135.559 53.2377 135.583 51.7703 135.686 50.2232Z"
        fill="#191E3E"
      />
      <path
        d="M248.929 50.2313C248.61 52.8072 249.931 55.5186 252.262 56.667C256.129 58.5809 259.542 57.5282 262.636 54.7052C264.061 55.9253 265.485 57.1375 267.028 58.4613C266.4 59.0355 265.866 59.5538 265.302 60.0403C260.091 64.4264 251.976 64.4902 247.043 60.1041C244.776 58.0944 243.67 55.383 243.145 52.4643C242.389 48.2377 242.532 44.0429 244.091 39.9678C247.306 31.5704 257.25 30.6214 262.883 34.9438C265.859 37.2245 267.314 40.2789 267.529 43.9632C267.633 45.7256 267.577 47.496 267.664 49.2505C267.704 50.024 267.466 50.2473 266.678 50.2473C261.125 50.2154 255.572 50.2313 250.011 50.2313H248.921H248.929ZM248.881 45.0956H261.483C261.618 41.0285 259.017 38.1018 255.222 38.1416C251.578 38.1815 249.04 40.223 248.873 45.0956H248.881Z"
        fill="#191E3E"
      />
      <path
        d="M190.867 47.1689C191.034 45.6856 191.114 43.5564 191.528 41.4989C192.53 36.5306 197.001 32.7665 202.061 32.4794C204.79 32.3279 207.487 32.4874 209.874 34.0345C213.247 36.2196 215.307 39.242 215.626 43.3331C215.912 46.9456 216 50.5582 215.323 54.1388C214.456 58.7482 210.12 62.6878 205.466 63.1982C202.531 63.5251 199.754 63.2141 197.136 61.7228C193.397 59.5936 191.559 56.3 191.162 52.1212C191.026 50.6858 190.987 49.2503 190.867 47.1769V47.1689ZM209.778 47.8468C209.691 46.4512 209.667 45.0955 209.508 43.7637C209.126 40.5897 206.731 38.5243 203.493 38.4844C200.263 38.4445 197.662 40.4861 197.359 43.6201C197.113 46.18 197.089 48.7798 197.224 51.3477C197.335 53.5009 198.226 55.359 200.295 56.4675C203.644 58.2698 208.967 56.9141 209.508 51.9378C209.659 50.5662 209.691 49.1865 209.778 47.8468Z"
        fill="#191E3E"
      />
      <path
        d="M167.255 41.6746C167.016 41.4114 166.833 41.1881 166.634 40.9808C164.215 38.4448 161.28 37.9982 158.058 38.9632C156.053 39.5613 154.772 41.0127 154.112 42.9426C153.006 46.2122 152.982 49.5377 154.096 52.8153C155.019 55.5267 157.246 57.0419 160.094 57.2094C162.998 57.3848 165.409 56.4996 167.247 54.0992C168.75 55.439 170.19 56.7229 171.765 58.1345C170.97 58.8602 170.278 59.5619 169.522 60.184C163.118 65.3994 153.515 63.9321 149.354 57.0898C148.041 54.9286 147.516 52.5202 147.309 50.0401C147.015 46.4754 147.238 42.9426 148.829 39.6889C151.064 35.1113 154.907 32.7987 159.919 32.4637C164.319 32.1607 168.042 33.6998 171.041 36.9455C171.24 37.1609 171.423 37.3842 171.702 37.6952C170.214 39.0269 168.758 40.3268 167.247 41.6825L167.255 41.6746Z"
        fill="#191E3E"
      />
      <path
        d="M173.261 37.4082V32.8068H176.292V23.6677H182.315V32.7749H186.698V37.3843H182.386C182.363 37.783 182.339 38.0701 182.339 38.3572C182.339 43.8279 182.339 49.3065 182.339 54.7772C182.339 56.6593 182.88 57.2015 184.733 57.2095C185.37 57.2095 186.014 57.2095 186.698 57.2095V62.9434C183.739 63.055 180.763 63.3261 178.353 61.0214C176.905 59.6338 176.3 57.9033 176.3 55.9415C176.3 50.1758 176.3 44.41 176.292 38.6363C176.292 37.8229 175.876 37.4162 175.043 37.4162C174.462 37.4162 173.882 37.4162 173.253 37.4162L173.261 37.4082Z"
        fill="#191E3E"
      />
      <path
        d="M242.524 34.7606C241.036 36.531 239.604 38.2296 238.149 39.9601C237.655 39.673 237.234 39.4098 236.796 39.1786C233.176 37.2567 228.8 39.5534 228.363 43.6205C228.275 44.41 228.228 45.1995 228.228 45.997C228.22 51.2922 228.228 56.5875 228.228 61.8907V62.9274H222.261V32.8466H228.204V36.1402C230.67 33.3092 233.59 32.2007 237.011 32.4638C239.048 32.6233 240.885 33.3411 242.54 34.7685L242.524 34.7606Z"
        fill="#191E3E"
      />
      <path
        d="M72.8989 41.9852C72.8989 48.7239 72.8909 55.4705 72.9148 62.2092C72.9148 62.8551 72.7159 63.1981 72.159 63.517C60.4481 70.2637 48.7451 77.0263 37.0501 83.7968C36.6603 84.0201 36.3739 84.0919 35.9443 83.8447C24.1538 77.0103 12.3474 70.1919 0.556905 63.3496C0.294364 63.198 0.0397789 62.7754 0.0397789 62.4803C0.0159116 48.8276 0.0238674 35.1668 0 21.5061C0 20.9319 0.30232 20.7485 0.684198 20.5252C11.3211 14.3846 21.95 8.23608 32.5869 2.09553C33.653 1.48147 34.735 0.87539 35.7851 0.229436C36.2625 -0.0656299 36.6205 -0.0815798 37.1297 0.213486C48.411 6.76075 59.6923 13.316 71.0213 19.7755C72.4534 20.589 72.9705 21.4343 72.9387 23.093C72.8273 29.3931 72.8909 35.6931 72.8909 41.9932L72.8989 41.9852ZM29.3489 45.0635V27.2638C29.5239 27.2399 29.6433 27.208 29.7547 27.208C35.1089 27.208 40.4552 27.208 45.8094 27.1921C46.3266 27.1921 46.4936 27.3994 46.6448 27.8619C47.8143 31.3868 51.3944 33.4443 54.9268 32.6468C58.3398 31.8812 60.6629 28.8189 60.5197 25.2781C60.3924 21.9766 57.7511 19.0977 54.4096 18.6033C51.0841 18.1168 47.7984 20.0945 46.7243 23.3243C46.4698 24.0899 46.0958 24.2095 45.3957 24.2095C39.3971 24.1856 33.3984 24.1936 27.3997 24.1936H26.2541V45.0555C24.6709 45.0555 23.1991 45.0236 21.7352 45.0714C21.0828 45.0954 20.7646 44.9279 20.5498 44.258C19.5792 41.2834 16.914 39.4094 13.8033 39.4094C10.2391 39.4094 7.24772 42.0251 6.74651 45.5739C6.26916 48.9791 8.42518 52.3125 11.7825 53.3413C15.124 54.37 18.8711 52.7751 20.2157 49.5134C20.7328 48.2613 21.3374 47.9025 22.5706 48.0381C23.5571 48.1417 24.5675 48.054 25.5699 48.062C25.7927 48.062 26.0154 48.1178 26.3018 48.1497V66.9143C27.0179 66.9143 27.6623 66.8664 28.2987 66.9302C29.0784 67.002 29.2932 66.7229 29.2932 65.9414C29.2614 60.3511 29.2773 54.7528 29.2773 49.1625C29.2773 48.8196 29.2773 48.4767 29.2773 48.1098C29.6353 48.0859 29.8581 48.062 30.0888 48.062C32.0857 48.062 34.0826 48.062 36.0875 48.062C36.175 48.3012 36.2625 48.4926 36.3182 48.684C37.249 51.7064 40.3438 53.9792 43.8921 53.5885C46.8437 53.2535 49.3895 51.0445 50.0578 48.0859C50.7341 45.0954 49.3259 41.8656 46.6925 40.3743C42.643 38.0856 37.8377 39.9437 36.3102 44.3856C36.2227 44.6408 35.9681 45.0395 35.7851 45.0395C33.645 45.0874 31.5129 45.0714 29.3409 45.0714L29.3489 45.0635Z"
        fill="#191E3E"
      />
      <path
        d="M53.3913 21.5701C51.1319 21.5701 49.2782 23.4043 49.2702 25.6532C49.2623 27.91 51.1876 29.8479 53.4231 29.8319C55.6905 29.816 57.5522 27.902 57.5363 25.6213C57.5124 23.3724 55.6746 21.5621 53.3993 21.5701H53.3913ZM43.0965 42.4161C40.8132 42.4161 39.0073 44.2104 38.9993 46.4912C38.9913 48.7959 40.8689 50.7019 43.1204 50.67C45.3878 50.6381 47.2892 48.7082 47.2574 46.4673C47.2176 44.2104 45.3719 42.4081 43.1045 42.4081L43.0965 42.4161ZM13.8192 42.4161C11.5041 42.4161 9.69814 44.2583 9.71405 46.5789C9.72996 48.8039 11.6393 50.7098 13.8351 50.6779C16.1025 50.646 18.004 48.7082 17.9722 46.4832C17.9324 44.2264 16.0866 42.4241 13.8192 42.4241V42.4161Z"
        fill="#191E3E"
      />
      <path
        d="M53.3913 21.5701C55.6667 21.5701 57.5124 23.3724 57.5283 25.6212C57.5522 27.894 55.6826 29.808 53.4152 29.8319C51.1796 29.8479 49.2463 27.91 49.2623 25.6531C49.2702 23.4122 51.1239 21.578 53.3834 21.5701H53.3913Z"
        fill="#191E3E"
      />
      <path
        d="M43.0885 42.4161C45.3559 42.4161 47.2017 44.2184 47.2414 46.4753C47.2812 48.7082 45.3718 50.6461 43.1044 50.678C40.8529 50.7099 38.9754 48.7959 38.9833 46.4992C38.9913 44.2184 40.7973 42.4321 43.0806 42.4241L43.0885 42.4161Z"
        fill="#191E3E"
      />
      <path
        d="M13.8192 42.4158C16.0866 42.4158 17.9324 44.2181 17.9722 46.475C18.0119 48.7079 16.1025 50.6378 13.8351 50.6697C11.6393 50.7016 9.72996 48.8036 9.71405 46.5707C9.69814 44.25 11.5121 42.4158 13.8192 42.4078V42.4158Z"
        fill="#191E3E"
      />
    </svg>
  );
}

export default FactoredLogo;
