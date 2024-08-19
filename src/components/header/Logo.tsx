import { Link } from 'react-router-dom'
import logo from '../../assets/LOGO.png'

interface Props {  
    className?: string
    }

const Logo = (props:Props) => {
  return (
    <Link to='/' className={`flex  ${props.className && props.className === 'vertical'? 'flex-col items-center gap-3':'flex-row items-center' }`}>
      <img src={logo} alt='logo' className='w-[55px]' />
      {props.className ? <div >
        <svg height="50" viewBox="0 0 161 77" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.55616 69.6284H0.283447V68.0469H6.71304V69.6284H4.44033V76.3656H2.55616V69.6284Z" fill="#3A541C"/>
            <path d="M12.6789 74.3897H10.1513L9.64164 76.3656H7.73657L10.3268 68.0469H12.5744L15.1647 76.3656H13.1844L12.6747 74.3897H12.6789ZM12.2987 72.9215L12.1065 72.158C11.9895 71.7427 11.8726 71.298 11.7639 70.8324C11.6553 70.3667 11.5425 69.9137 11.4339 69.4774H11.3838C11.2835 69.922 11.1791 70.3751 11.0704 70.8366C10.966 71.298 10.8532 71.7385 10.7362 72.158L10.5315 72.9215H12.2987Z" fill="#3A541C"/>
            <path d="M17.8635 74.0291C18.1601 74.285 18.4859 74.4947 18.8452 74.6542C19.2045 74.8136 19.5596 74.8975 19.9064 74.8975C20.2949 74.8975 20.5874 74.8261 20.7754 74.6835C20.9675 74.5367 21.0636 74.3437 21.0636 74.0962C21.0636 73.9704 21.0344 73.8571 20.9801 73.7648C20.9258 73.6725 20.8464 73.5886 20.7378 73.5173C20.6333 73.446 20.5038 73.3747 20.3576 73.3118C20.2114 73.2488 20.0484 73.1775 19.8688 73.102L18.7867 72.6406C18.5737 72.5567 18.369 72.4476 18.1726 72.3091C17.9721 72.1707 17.7966 72.0113 17.6379 71.8309C17.4833 71.6463 17.3579 71.4366 17.2619 71.1933C17.1699 70.95 17.124 70.6773 17.124 70.371C17.124 70.0313 17.195 69.7124 17.3371 69.4104C17.4833 69.1083 17.6838 68.8441 17.947 68.6175C18.2102 68.391 18.5194 68.2148 18.8787 68.089C19.2379 67.9631 19.6348 67.896 20.0693 67.896C20.5539 67.896 21.0302 67.9883 21.4981 68.1771C21.9702 68.3658 22.3796 68.6385 22.7389 68.9951L21.7864 70.1823C21.5148 69.9683 21.2433 69.8047 20.9717 69.6915C20.7002 69.5782 20.3994 69.5195 20.0693 69.5195C19.7393 69.5195 19.4886 69.5866 19.3006 69.7166C19.1126 69.8467 19.0165 70.0313 19.0165 70.2704C19.0165 70.4004 19.0499 70.5053 19.1126 70.5976C19.1753 70.6899 19.263 70.7696 19.38 70.8409C19.4928 70.9122 19.6307 70.9793 19.7811 71.0423C19.9356 71.1052 20.0986 71.1765 20.274 71.252L21.3435 71.6841C21.8532 71.8896 22.2501 72.1707 22.5426 72.5273C22.835 72.8839 22.9812 73.3579 22.9812 73.9452C22.9812 74.2934 22.9102 74.6248 22.7723 74.931C22.6345 75.2415 22.4298 75.5141 22.1624 75.7491C21.895 75.984 21.565 76.1727 21.1764 76.3112C20.7879 76.4496 20.3451 76.5209 19.8563 76.5209C19.3131 76.5209 18.7742 76.4203 18.2353 76.2231C17.6963 76.0217 17.2159 75.7239 16.7939 75.3212L17.8635 74.0333V74.0291Z" fill="#3A541C"/>
            <path d="M27.0378 69.6284H24.7651V68.0469H31.1947V69.6284H28.9178V76.3656H27.0378V69.6284Z" fill="#3A541C"/>
            <path d="M33.7683 68.0469H38.9488V69.6284H35.6316V71.3022H38.4558V72.8711H35.6316V74.7841H39.0783V76.3656H33.7683V68.0469Z" fill="#3A541C"/>
            <path d="M45.9341 68.0469H47.9143L49.2972 71.7846L49.7943 73.2403H49.8445L50.3416 71.7846L51.6869 68.0469H53.6588V76.3656H51.9167V73.3158C51.9167 73.1103 51.925 72.8879 51.9417 72.6404C51.9584 72.3929 51.9793 72.1454 52.0044 71.8937C52.0295 71.642 52.0545 71.3945 52.0796 71.1554C52.1047 70.9121 52.1339 70.6897 52.159 70.4842H52.1088L51.4237 72.4097L50.1536 75.6356H49.4058L48.1358 72.4097L47.4757 70.4842H47.4255C47.4506 70.6897 47.4757 70.9121 47.5049 71.1554C47.53 71.3987 47.5551 71.642 47.5759 71.8937C47.5968 72.1454 47.6177 72.3929 47.6344 72.6404C47.6511 72.8879 47.6595 73.1144 47.6595 73.3158V76.3656H45.9466V68.0469H45.9341Z" fill="#3A541C"/>
            <path d="M60.247 74.8976C60.8152 74.8976 61.2622 74.6543 61.5923 74.1634C61.9223 73.6726 62.0894 73.0098 62.0894 72.1666C62.0894 71.3234 61.9223 70.6816 61.5923 70.2159C61.2622 69.7503 60.8152 69.5154 60.247 69.5154C59.6789 69.5154 59.2318 69.7503 58.9018 70.2159C58.5717 70.6858 58.4088 71.336 58.4088 72.1666C58.4088 72.9972 58.5717 73.6726 58.9018 74.1634C59.2318 74.6543 59.6789 74.8976 60.247 74.8976ZM60.247 76.5168C59.6872 76.5168 59.1775 76.4162 58.718 76.219C58.2584 76.0176 57.8615 75.7324 57.5315 75.359C57.2014 74.9857 56.9466 74.5284 56.7628 73.9914C56.5831 73.4545 56.4912 72.8462 56.4912 72.1666C56.4912 71.487 56.5831 70.8829 56.7628 70.3502C56.9466 69.8174 57.2014 69.3727 57.5315 69.0078C57.8615 68.647 58.2584 68.3701 58.718 68.1772C59.1817 67.9842 59.6914 67.8877 60.247 67.8877C60.8027 67.8877 61.3165 67.9842 61.7761 68.1772C62.2398 68.3701 62.6325 68.647 62.9626 69.012C63.2926 69.3769 63.5517 69.8258 63.7313 70.3586C63.9151 70.8913 64.0029 71.4912 64.0029 72.1624C64.0029 72.8336 63.9109 73.4503 63.7313 73.9872C63.5517 74.5242 63.2926 74.9773 62.9626 75.3548C62.6325 75.7282 62.2357 76.0134 61.7761 76.2148C61.3124 76.412 60.8027 76.5126 60.247 76.5126V76.5168Z" fill="#3A541C"/>
            <path d="M71.3223 76.3656L69.7348 73.3661H68.7071V76.3656H66.8396V68.0469H69.8225C70.2612 68.0469 70.6748 68.0888 71.0592 68.1769C71.4435 68.2608 71.7819 68.4035 72.0702 68.6048C72.3584 68.8062 72.5882 69.0705 72.7553 69.4019C72.9266 69.7333 73.0102 70.1444 73.0102 70.6394C73.0102 71.2519 72.8765 71.7553 72.6091 72.1538C72.3417 72.5481 71.9824 72.8418 71.5354 73.0389L73.4154 76.3698H71.3182L71.3223 76.3656ZM68.7029 71.8727H69.668C70.1609 71.8727 70.5328 71.7679 70.7918 71.5623C71.0508 71.3525 71.1803 71.0463 71.1803 70.6352C71.1803 70.2241 71.0508 69.943 70.7918 69.7794C70.5328 69.6158 70.1568 69.5361 69.668 69.5361H68.7029V71.8727Z" fill="#3A541C"/>
            <path d="M79.2893 74.8976C79.8574 74.8976 80.3045 74.6543 80.6345 74.1634C80.9646 73.6726 81.1317 73.0098 81.1317 72.1666C81.1317 71.3234 80.9646 70.6816 80.6345 70.2159C80.3045 69.7503 79.8574 69.5154 79.2893 69.5154C78.7211 69.5154 78.2741 69.7503 77.944 70.2159C77.614 70.6858 77.4469 71.336 77.4469 72.1666C77.4469 72.9972 77.6098 73.6726 77.944 74.1634C78.2741 74.6543 78.7211 74.8976 79.2893 74.8976ZM79.2893 76.5168C78.7294 76.5168 78.2198 76.4162 77.7602 76.219C77.3006 76.0176 76.9038 75.7324 76.5737 75.359C76.2437 74.9857 75.9888 74.5284 75.805 73.9914C75.6254 73.4545 75.5334 72.8462 75.5334 72.1666C75.5334 71.487 75.6254 70.8829 75.805 70.3502C75.9888 69.8174 76.2437 69.3727 76.5737 69.0078C76.9038 68.647 77.3006 68.3701 77.7602 68.1772C78.2239 67.9842 78.7336 67.8877 79.2893 67.8877C79.8449 67.8877 80.3588 67.9842 80.8183 68.1772C81.2821 68.3701 81.6748 68.647 82.0048 69.012C82.3349 69.3769 82.5939 69.8258 82.7735 70.3586C82.9574 70.8913 83.0451 71.4912 83.0451 72.1624C83.0451 72.8336 82.9532 73.4503 82.7735 73.9872C82.5939 74.5242 82.3349 74.9773 82.0048 75.3548C81.6748 75.7282 81.2779 76.0134 80.8183 76.2148C80.3546 76.412 79.8449 76.5126 79.2893 76.5126V76.5168Z" fill="#3A541C"/>
            <path d="M85.4851 72.2588C85.4851 71.5708 85.5895 70.9583 85.8026 70.4172C86.0157 69.876 86.2998 69.4188 86.6591 69.0454C87.0183 68.6721 87.4403 68.3868 87.9166 68.1896C88.397 67.9925 88.9025 67.896 89.4331 67.896C89.9637 67.896 90.4191 68.0051 90.8368 68.2232C91.2546 68.4413 91.6055 68.693 91.8855 68.9825L90.8577 70.1445C90.6447 69.9473 90.4316 69.7963 90.2185 69.6873C90.0013 69.5782 89.7506 69.5195 89.4624 69.5195C89.1741 69.5195 88.9067 69.5824 88.656 69.704C88.4054 69.8257 88.1881 70.0019 88.0001 70.2326C87.8121 70.4633 87.6659 70.7444 87.5615 71.0758C87.457 71.4072 87.4027 71.7806 87.4027 72.1959C87.4027 73.0559 87.5865 73.7229 87.95 74.1927C88.3135 74.6625 88.8023 74.8975 89.4122 74.8975C89.7506 74.8975 90.0472 74.8303 90.3021 74.6961C90.5569 74.5577 90.7867 74.3815 90.9872 74.1591L92.015 75.296C91.6682 75.7071 91.2713 76.0133 90.8285 76.2147C90.3856 76.4161 89.9052 76.5209 89.3871 76.5209C88.8691 76.5209 88.3511 76.4286 87.8748 76.2483C87.3985 76.0637 86.9849 75.7952 86.6298 75.4386C86.2747 75.082 85.9948 74.6374 85.7901 74.1046C85.5896 73.5718 85.4851 72.9594 85.4851 72.2588Z" fill="#3A541C"/>
            <path d="M93.6777 72.2588C93.6777 71.5708 93.7822 70.9583 93.9952 70.4172C94.2083 69.876 94.4924 69.4188 94.8517 69.0454C95.211 68.6721 95.6329 68.3868 96.1092 68.1896C96.5896 67.9925 97.0952 67.896 97.6257 67.896C98.1563 67.896 98.6117 68.0051 99.0295 68.2232C99.4472 68.4413 99.7982 68.693 100.078 68.9825L99.0504 70.1445C98.8373 69.9473 98.6242 69.7963 98.4112 69.6873C98.1939 69.5782 97.9432 69.5195 97.655 69.5195C97.3667 69.5195 97.0993 69.5824 96.8487 69.704C96.598 69.8257 96.3808 70.0019 96.1928 70.2326C96.0048 70.4633 95.8585 70.7444 95.7541 71.0758C95.6496 71.4072 95.5953 71.7806 95.5953 72.1959C95.5953 73.0559 95.7792 73.7229 96.1426 74.1927C96.5061 74.6625 96.9949 74.8975 97.6048 74.8975C97.9432 74.8975 98.2399 74.8303 98.4947 74.6961C98.7496 74.5577 98.9793 74.3815 99.1799 74.1591L100.208 75.296C99.8608 75.7071 99.4639 76.0133 99.0211 76.2147C98.5783 76.4161 98.0978 76.5209 97.5798 76.5209C97.0617 76.5209 96.5437 76.4286 96.0674 76.2483C95.5912 76.0637 95.1776 75.7952 94.8224 75.4386C94.4673 75.082 94.1874 74.6374 93.9827 74.1046C93.7822 73.5718 93.6777 72.9594 93.6777 72.2588Z" fill="#3A541C"/>
            <path d="M105.63 74.8976C106.198 74.8976 106.645 74.6543 106.975 74.1634C107.305 73.6726 107.472 73.0098 107.472 72.1666C107.472 71.3234 107.305 70.6816 106.975 70.2159C106.645 69.7503 106.198 69.5154 105.63 69.5154C105.062 69.5154 104.615 69.7503 104.285 70.2159C103.955 70.6858 103.788 71.336 103.788 72.1666C103.788 72.9972 103.951 73.6726 104.285 74.1634C104.615 74.6543 105.062 74.8976 105.63 74.8976ZM105.63 76.5168C105.07 76.5168 104.561 76.4162 104.101 76.219C103.641 76.0176 103.245 75.7324 102.915 75.359C102.584 74.9857 102.33 74.5284 102.146 73.9914C101.966 73.4545 101.874 72.8462 101.874 72.1666C101.874 71.487 101.966 70.8829 102.146 70.3502C102.33 69.8174 102.584 69.3727 102.915 69.0078C103.245 68.647 103.641 68.3701 104.101 68.1772C104.565 67.9842 105.074 67.8877 105.63 67.8877C106.186 67.8877 106.7 67.9842 107.159 68.1772C107.623 68.3701 108.016 68.647 108.346 69.012C108.676 69.3769 108.935 69.8258 109.114 70.3586C109.298 70.8913 109.386 71.4912 109.386 72.1624C109.386 72.8336 109.294 73.4503 109.114 73.9872C108.935 74.5242 108.676 74.9773 108.346 75.3548C108.016 75.7282 107.619 76.0134 107.159 76.2148C106.695 76.412 106.186 76.5126 105.63 76.5126V76.5168Z" fill="#3A541C"/>
            <path d="M112.269 69.31L112.206 67.6152H114.086L114.023 69.31L113.656 71.848H112.641L112.269 69.31Z" fill="#3A541C"/>
            <path d="M117.846 74.0291C118.143 74.285 118.469 74.4947 118.828 74.6542C119.187 74.8136 119.542 74.8975 119.889 74.8975C120.278 74.8975 120.57 74.8261 120.758 74.6835C120.95 74.5367 121.046 74.3437 121.046 74.0962C121.046 73.9704 121.017 73.8571 120.963 73.7648C120.908 73.6725 120.829 73.5886 120.72 73.5173C120.616 73.446 120.486 73.3747 120.34 73.3118C120.194 73.2488 120.031 73.1775 119.851 73.102L118.769 72.6406C118.556 72.5567 118.352 72.4476 118.155 72.3091C117.955 72.1707 117.779 72.0113 117.62 71.8309C117.466 71.6463 117.341 71.4366 117.244 71.1933C117.153 70.95 117.107 70.6773 117.107 70.371C117.107 70.0313 117.178 69.7124 117.32 69.4104C117.466 69.1083 117.666 68.8441 117.93 68.6175C118.193 68.391 118.502 68.2148 118.861 68.089C119.221 67.9631 119.617 67.896 120.052 67.896C120.537 67.896 121.009 67.9883 121.481 68.1771C121.953 68.3658 122.362 68.6385 122.722 68.9951L121.769 70.1823C121.497 69.9683 121.226 69.8047 120.954 69.6915C120.683 69.5782 120.382 69.5195 120.052 69.5195C119.722 69.5195 119.471 69.5866 119.283 69.7166C119.095 69.8467 118.999 70.0313 118.999 70.2704C118.999 70.4004 119.033 70.5053 119.095 70.5976C119.158 70.6899 119.246 70.7696 119.363 70.8409C119.475 70.9122 119.613 70.9793 119.764 71.0423C119.918 71.1052 120.081 71.1765 120.261 71.252L121.33 71.6841C121.84 71.8896 122.237 72.1707 122.529 72.5273C122.822 72.8839 122.968 73.3579 122.968 73.9452C122.968 74.2934 122.897 74.6248 122.759 74.931C122.621 75.2415 122.417 75.5141 122.149 75.7491C121.882 75.984 121.552 76.1727 121.163 76.3112C120.775 76.4496 120.332 76.5209 119.843 76.5209C119.3 76.5209 118.761 76.4203 118.222 76.2231C117.683 76.0217 117.203 75.7239 116.781 75.3212L117.85 74.0333L117.846 74.0291Z" fill="#3A541C"/>
            <path d="M132.502 74.9099C133.525 74.9099 134.039 74.5324 134.039 73.7731C134.039 73.4081 133.914 73.1438 133.659 72.976C133.404 72.8082 133.02 72.7285 132.502 72.7285H131.445V74.9099H132.502ZM132.326 71.4029C132.781 71.4029 133.116 71.3106 133.325 71.1302C133.533 70.9456 133.638 70.6981 133.638 70.3835C133.638 70.0689 133.533 69.8423 133.32 69.7081C133.107 69.5697 132.781 69.5025 132.343 69.5025H131.453V71.4029H132.33H132.326ZM129.581 68.0469H132.414C132.844 68.0469 133.245 68.0804 133.613 68.1434C133.981 68.2063 134.302 68.3196 134.578 68.4832C134.854 68.6426 135.071 68.8565 135.225 69.1208C135.384 69.3851 135.459 69.7165 135.459 70.115C135.459 70.3038 135.43 70.4884 135.376 70.6772C135.322 70.8617 135.238 71.0379 135.129 71.2015C135.021 71.3609 134.875 71.5078 134.699 71.6336C134.519 71.7595 134.315 71.8559 134.077 71.9147V71.965C134.67 72.0741 135.117 72.288 135.418 72.6027C135.718 72.9173 135.869 73.3536 135.869 73.9157C135.869 74.3394 135.785 74.7044 135.622 75.0148C135.459 75.321 135.23 75.5727 134.937 75.7741C134.645 75.9754 134.302 76.1223 133.914 76.2188C133.525 76.3152 133.107 76.3656 132.656 76.3656H129.581V68.0469Z" fill="#3A541C"/>
            <path d="M138.543 68.0469H143.723V69.6284H140.406V71.3022H143.23V72.8711H140.406V74.7841H143.853V76.3656H138.543V68.0469Z" fill="#3A541C"/>
            <path d="M147.316 74.0291C147.613 74.285 147.939 74.4947 148.298 74.6542C148.657 74.8136 149.012 74.8975 149.359 74.8975C149.748 74.8975 150.04 74.8261 150.228 74.6835C150.42 74.5367 150.516 74.3437 150.516 74.0962C150.516 73.9704 150.487 73.8571 150.433 73.7648C150.378 73.6725 150.299 73.5886 150.19 73.5173C150.086 73.446 149.956 73.3747 149.81 73.3118C149.664 73.2488 149.501 73.1775 149.321 73.102L148.239 72.6406C148.026 72.5567 147.822 72.4476 147.625 72.3091C147.425 72.1707 147.249 72.0113 147.09 71.8309C146.936 71.6463 146.811 71.4366 146.714 71.1933C146.623 70.95 146.577 70.6773 146.577 70.371C146.577 70.0313 146.648 69.7124 146.79 69.4104C146.936 69.1083 147.136 68.8441 147.4 68.6175C147.663 68.391 147.972 68.2148 148.331 68.089C148.691 67.9631 149.087 67.896 149.522 67.896C150.007 67.896 150.479 67.9883 150.951 68.1771C151.423 68.3658 151.832 68.6385 152.192 68.9951L151.239 70.1823C150.967 69.9683 150.696 69.8047 150.424 69.6915C150.153 69.5782 149.852 69.5195 149.522 69.5195C149.192 69.5195 148.941 69.5866 148.753 69.7166C148.565 69.8467 148.469 70.0313 148.469 70.2704C148.469 70.4004 148.503 70.5053 148.565 70.5976C148.628 70.6899 148.716 70.7696 148.833 70.8409C148.945 70.9122 149.083 70.9793 149.234 71.0423C149.388 71.1052 149.551 71.1765 149.731 71.252L150.8 71.6841C151.31 71.8896 151.707 72.1707 151.999 72.5273C152.292 72.8839 152.438 73.3579 152.438 73.9452C152.438 74.2934 152.367 74.6248 152.229 74.931C152.091 75.2415 151.887 75.5141 151.619 75.7491C151.352 75.984 151.022 76.1727 150.633 76.3112C150.245 76.4496 149.802 76.5209 149.313 76.5209C148.77 76.5209 148.231 76.4203 147.692 76.2231C147.153 76.0217 146.673 75.7239 146.251 75.3212L147.32 74.0333L147.316 74.0291Z" fill="#3A541C"/>
            <path d="M156.49 69.6284H154.218V68.0469H160.647V69.6284H158.37V76.3656H156.49V69.6284Z" fill="#3A541C"/>
            <path d="M33.054 0.87232C35.1429 0.87232 36.7137 0.725491 37.7582 0.436035C38.2219 2.06789 38.4559 3.67039 38.4559 5.24771C38.4559 6.179 38.0506 6.64885 37.236 6.64885H30.4429V49.5093L30.7896 57.7315C28.8177 58.0209 26.8709 58.1678 24.9533 58.1678C24.0258 58.1678 23.5579 57.6727 23.5579 56.6827V6.64885H20.9426C18.8537 6.64885 17.2829 6.79567 16.2385 7.08513C15.7747 5.45327 15.5408 3.85078 15.5408 2.27345C15.5408 1.33796 15.946 0.87232 16.7607 0.87232H33.0498H33.054Z" fill="#335A06"/>
            <path d="M48.6872 9.27098V30.0866H56.7879V9.27098C56.7879 8.16349 56.4119 7.30351 55.6557 6.69104C54.8995 6.07857 53.9136 5.77233 52.6937 5.77233C51.4738 5.77233 50.5003 6.07857 49.7776 6.69104C49.0507 7.30351 48.6914 8.16349 48.6914 9.27098H48.6872ZM41.8064 56.6788V9.27098C41.8064 6.35544 42.7924 4.08174 44.7684 2.44988C46.7445 0.818025 49.4434 0 52.8691 0C56.2949 0 58.952 0.759296 60.8403 2.27369C62.7287 3.78809 63.6729 6.00725 63.6729 8.91859V50.294C63.6729 51.5189 63.9194 52.3789 64.4123 52.8739C64.9053 53.3689 65.7618 53.6164 66.9817 53.6164C66.9817 56.9431 65.1226 58.6043 61.4085 58.6043C58.3295 58.6043 56.7921 56.5907 56.7921 52.5677V35.859H48.6914V49.5053L49.0381 57.7275C47.0662 58.017 45.1194 58.1638 43.2018 58.1638C42.2743 58.1638 41.8064 57.6688 41.8064 56.6788Z" fill="#335A06"/>
            <path d="M77.7102 34.0255V51.955H82.1512C83.3711 51.955 84.357 51.6488 85.1132 51.0363C85.8694 50.4238 86.2454 49.5638 86.2454 48.4564V37.5242C86.2454 36.4167 85.8694 35.5567 85.1132 34.9442C84.357 34.3318 83.3711 34.0255 82.1512 34.0255H77.7102ZM82.4144 6.64469C80.8477 6.64469 79.2769 7.43336 77.7102 9.00649V28.249H81.9757C83.1371 28.249 84.0688 27.9302 84.7623 27.2883C85.46 26.6465 85.8067 25.8033 85.8067 24.7504V9.96714C85.8067 7.75218 84.6746 6.64469 82.4102 6.64469H82.4144ZM70.8294 57.7273V9.35467C70.8294 8.071 70.5955 7.15229 70.1317 6.59855C69.668 6.04481 68.8241 5.76794 67.6042 5.76794C67.5457 4.25354 67.9509 3.05796 68.8241 2.1812C69.6972 1.30445 71.1051 0.868164 73.052 0.868164C74.9988 0.868164 76.3482 1.82882 77.1044 3.75433C79.3688 1.82882 81.6916 0.868164 84.073 0.868164C89.8216 0.868164 92.6959 3.72497 92.6959 9.44277V24.7504C92.6959 27.431 91.852 29.4739 90.1683 30.8709C92.1402 32.2133 93.1304 34.4282 93.1304 37.52V48.4522C93.1304 51.3677 92.1277 53.6414 90.1265 55.2733C88.1212 56.9051 85.4098 57.7231 81.9799 57.7231H70.8294V57.7273Z" fill="#335A06"/>
            <path d="M111.868 51.955C113.957 51.955 115.523 51.8081 116.572 51.5145C117.036 53.1463 117.269 54.753 117.269 56.3261C117.269 57.2574 116.864 57.7273 116.05 57.7273H98.8873V9.09453L98.5405 0.87232C100.512 0.582864 102.459 0.436035 104.377 0.436035C105.304 0.436035 105.772 0.93105 105.772 1.92107V51.955H111.872H111.868Z" fill="#335A06"/>
            <path d="M127.63 9.27098V30.0866H135.731V9.27098C135.731 8.16349 135.355 7.30351 134.599 6.69104C133.843 6.07857 132.857 5.77233 131.637 5.77233C130.417 5.77233 129.443 6.07857 128.721 6.69104C127.994 7.30351 127.634 8.16349 127.634 9.27098H127.63ZM120.75 56.6788V9.27098C120.75 6.35544 121.735 4.08174 123.712 2.44988C125.688 0.818025 128.386 0 131.812 0C135.238 0 137.895 0.759296 139.783 2.27369C141.672 3.78809 142.616 6.00725 142.616 8.91859V50.294C142.616 51.5189 142.862 52.3789 143.355 52.8739C143.848 53.3689 144.705 53.6164 145.925 53.6164C145.925 56.9431 144.066 58.6043 140.352 58.6043C137.273 58.6043 135.735 56.5907 135.735 52.5677V35.859H127.634V49.5053L127.981 57.7275C126.009 58.017 124.062 58.1638 122.145 58.1638C121.217 58.1638 120.75 57.6688 120.75 56.6788Z" fill="#335A06"/>
        </svg>

      </div> : null}
    </Link>
  )
}

export default Logo
