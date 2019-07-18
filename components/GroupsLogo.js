import React from 'react';
import * as Svg from 'react-native-svg';

export default ({ width, height, color, style }) => {
  return (
    <Svg.Svg
      width={width}
      height={height}
      viewBox="0 0 35 35"
      fill={color}
      style={style}
    >
      <Svg.Path d="M13.8311685,24.7577222 C13.9875326,24.3715272 14.0764246,23.9542709 14.0764246,23.5142364 C14.0764246,21.6940466 12.6038171,20.2093184 10.7477962,20.1037101 C10.6535494,19.6357204 10.6,19.1542709 10.6,18.6593615 C10.6,15.6122519 12.4838665,12.9875755 15.1816834,11.8 C15.7385967,12.9823986 16.9691611,13.805522 18.4,13.805522 C19.8319099,13.805522 21.0614033,12.9823986 21.6183166,11.8 C24.3161335,12.9875755 26.2,15.6122519 26.2,18.6593615 C26.2,19.1677308 26.1453797,19.6626402 26.0457778,20.142019 C25.860497,20.1130285 25.6720033,20.0943917 25.4770836,20.0943917 C23.5225319,20.0943917 21.9385418,21.6257118 21.9385418,23.5142364 C21.9385418,24.103365 22.092764,24.6583261 22.3637237,25.1418464 C21.2006316,25.8096635 19.8479747,26.2 18.4,26.2 C16.6928464,26.2 15.1174241,25.6605695 13.8311685,24.7577222 M27.0921924,20.52724 C27.2466508,19.8826 27.3307097,19.21246 27.3307097,18.52192 C27.3307097,14.8183 24.9802111,11.63896 21.6535779,10.31092 C21.621005,8.47696 20.0816753,7 18.1850951,7 C16.2885149,7 14.7491852,8.47696 14.7166123,10.31092 C11.3899791,11.63896 9.04053121,14.8183 9.04053121,18.52192 C9.04053121,19.08598 9.097271,19.63678 9.20129396,20.17126 C7.91309043,20.66392 7,21.87976 7,23.3047 C7,25.16722 8.55403999,26.6758 10.471635,26.6758 C11.4025879,26.6758 12.245279,26.31778 12.868366,25.73842 C14.3688184,26.7829 16.2034052,27.4 18.1850951,27.4 C19.9829061,27.4 21.6598823,26.89204 23.075225,26.0179 C23.6510288,26.42896 24.3602763,26.6758 25.128365,26.6758 C27.04596,26.6758 28.6,25.16722 28.6,23.3047 C28.6,22.15108 28.0021307,21.13414 27.0921924,20.52724" />
    </Svg.Svg>
  );
};
