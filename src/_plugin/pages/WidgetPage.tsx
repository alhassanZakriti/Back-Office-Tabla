import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Logo from '../../components/header/Logo';

import logo from '../../assets/logo.png';
import logovertical from '../../assets/LOGO-Vert.png';
import ReservationProcess from '../../components/reservation/ReservationProcess';
import { Download } from 'lucide-react';
import { BaseKey, BaseRecord, useList } from '@refinedev/core';
import { table } from 'console';

import pdf from '../../assets/Regression logistique.pdf'



const WidgetPage = () => {
    const { restaurant } = useParams();

    const downloadPdf = () => {
      const link = document.createElement('a');
      link.href = pdf;
      link.download = 'Regression logistique.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const { data: roofsData, isLoading: isLoadingRoofs,  error :roofsError } = useList({
        resource: "api/v1/bo/floors",
        meta: {
          headers: {
            "X-Restaurant-ID": 1,
          },
        },
      });
    
      const { data: tablesData, isLoading: isLoadingTables, error: errorTables } = useList({
        resource: "api/v1/bo/tables",
        meta: {
          headers: {
            "X-Restaurant-ID": 1,
          },
        },
      });
      
      const [roofs,setRoofs] = useState<BaseRecord>([]);
      const [tables,setTables] = useState<BaseRecord>([]);
      const [focusedRoof, setFocusedRoof] = useState<BaseKey | undefined>(undefined);
      const [floorId, setFloorId] = useState<BaseKey | undefined>(undefined);
      const [reservedTables, setReservedTables] = useState<BaseKey[]>([1,4]);
      const [selectedTable, setSelectedTable] = useState<BaseKey | undefined>(undefined);
      const [step, setStep] = useState(1);
      const [showProcess, setShowProcess] = useState(false);


      interface infoType {
        tableId?: BaseKey;
        reserveDate: string;
        source?: string;
        status?: string; 
        time: string;
        guests: number;
        firstname: string;
        lastname: string;
        email: string;
        phone: string;
        message?: string;
      }
      const [allInformations, setAllInformations] = useState<infoType>();


      localStorage.setItem('darkMode', 'false');

      useEffect(() => {
        if (focusedRoof) {
          const foundFloor = roofs.find((roof: BaseRecord) => roof.id === focusedRoof);
          setFloorId(foundFloor?.id);
        }
      }, [focusedRoof, roofs]);

      useEffect(() => {
        if (roofsData?.data) {
          setRoofs(roofsData.data);
        }
        if (tablesData?.data) {
          setTables(tablesData.data);
        }
      }, [roofsData, tablesData]);


    interface dataTypes {  
        reserveDate: string,
        time: string,
        guests: number
    }


    const [data, setData] = useState<dataTypes>({
        reserveDate: '',
        time: '',
        guests: 0
    });

    useEffect(() => {
        console.log(data);
    }, [data]);
    
    const [userInfromation, setUserInformation] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        message: ''

    });

    console.log(tablesData)

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const updatedUserInformation = {
            firstname: e.target.firstname.value,
            lastname: e.target.lastname.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            message: e.target.message.value
        };
        setUserInformation(updatedUserInformation);
        if (e.target.firstname.value !== '' && e.target.lastname.value !== '' && e.target.email.value !== '' && e.target.phone.value !== '') {
            setStep(4);
        }
        
      }
    useEffect(() => {
      console.log(userInfromation);
    }, [userInfromation]);


    const handleConfirmation = () => {
        setAllInformations({
          firstname: userInfromation.firstname,
          lastname: userInfromation.lastname,
          email: userInfromation.email,
          source: 'widget',
          status: 'pending',
          phone: userInfromation.phone,
          message: userInfromation.message,
          reserveDate: data.reserveDate,
          time: data.time,
          guests: data.guests
        });
        setStep(5);
      }
      console.log(allInformations);
  return (
    <div  className='text-center flex flex-col items-center overflow-y-scroll justify-center h-screen'>
      <img src='https://www.darelkaid.ma/wp-content/uploads/2023/02/Logo_Dar_El_Kaid-Transp.png' alt="logo" className='w-[8em]'/>
      {/* <h1 className='text-3xl text-greentheme font-bold mt-4'>{restaurant}</h1> */}
      <img
        src="https://www.darelkaid.ma/wp-content/uploads/2023/02/Logo_Dar_El_Kaid-Transp.png"
        alt="logo"
        className="z-[-10] w-[50em] blur-md opacity-30 left-[-10em] top-[-10em] absolute"
      />
      <svg width="350" className='mt-[1em] '  viewBox="0 0 509 59" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.304 57.36C1.37067 57.36 2.24533 57.2107 2.928 56.912C3.61067 56.6133 4.12267 56.1653 4.464 55.568C4.80533 54.9707 5.04 54.224 5.168 53.328C5.296 52.3893 5.36 51.3013 5.36 50.064V10.32C5.36 9.38133 5.31733 8.54933 5.232 7.824C5.14667 7.056 4.95467 6.416 4.656 5.904C4.35733 5.34933 3.93067 4.92266 3.376 4.624C2.82133 4.32533 2.07467 4.176 1.136 4.176V3.536H26.928C29.1467 3.536 31.216 3.728 33.136 4.112C35.0987 4.45333 36.784 5.09333 38.192 6.032C39.6427 6.97066 40.7733 8.25067 41.584 9.872C42.3947 11.4507 42.8 13.456 42.8 15.888C42.8 18.2773 42.2453 20.2827 41.136 21.904C40.0267 23.5253 38.6613 24.8267 37.04 25.808C35.4613 26.7467 33.7547 27.4293 31.92 27.856C30.128 28.24 28.528 28.432 27.12 28.432C29.4667 29.2427 31.792 30.0107 34.096 30.736C36.4 31.4613 38.4907 32.3573 40.368 33.424C42.2453 34.4907 43.8027 35.856 45.04 37.52C46.2773 39.1413 47.0027 41.2747 47.216 43.92C47.4293 46.736 47.0667 49.0613 46.128 50.896C45.232 52.688 43.888 54.1173 42.096 55.184C40.3467 56.208 38.2347 56.9333 35.76 57.36C33.328 57.7867 30.6827 58 27.824 58H0.304V57.36ZM16.176 22.544C15.0667 21.2213 14.192 19.6427 13.552 17.808V57.296H25.392C27.184 57.296 28.912 57.1253 30.576 56.784C32.24 56.4 33.6907 55.7173 34.928 54.736C36.1653 53.712 37.1467 52.3467 37.872 50.64C38.64 48.8907 39.024 46.6507 39.024 43.92C39.024 41.744 38.6613 39.952 37.936 38.544C37.2107 37.0933 36.2293 35.8773 34.992 34.896C33.7973 33.872 32.4107 32.9973 30.832 32.272C29.296 31.504 27.6747 30.6933 25.968 29.84C24.2613 28.944 22.5547 27.9413 20.848 26.832C19.184 25.7227 17.6267 24.2933 16.176 22.544ZM13.552 14.608C13.808 16.5707 14.2987 18.2773 15.024 19.728C15.792 21.136 16.7307 22.3733 17.84 23.44C18.992 24.464 20.272 25.36 21.68 26.128C23.1307 26.8533 24.6453 27.4933 26.224 28.048C29.296 27.8773 31.4507 26.704 32.688 24.528C33.968 22.3093 34.608 19.4293 34.608 15.888C34.608 13.6267 34.288 11.7493 33.648 10.256C33.0507 8.76266 32.2187 7.568 31.152 6.672C30.128 5.776 28.912 5.15733 27.504 4.816C26.1387 4.432 24.688 4.24 23.152 4.24H13.552V14.608ZM73.3065 58C70.0212 58 67.0558 57.424 64.4105 56.272C61.7652 55.12 59.5038 53.5413 57.6265 51.536C55.7918 49.5307 54.3625 47.184 53.3385 44.496C52.3572 41.808 51.8665 38.9067 51.8665 35.792C51.8665 32.8053 52.3785 30.032 53.4025 27.472C54.4265 24.8693 55.8772 22.608 57.7545 20.688C59.6318 18.768 61.8932 17.2747 64.5385 16.208C67.2265 15.0987 70.2132 14.544 73.4985 14.544C76.8265 14.544 79.8132 15.0987 82.4585 16.208C85.1038 17.3173 87.3652 18.8533 89.2425 20.816C91.1198 22.736 92.5492 25.0187 93.5305 27.664C94.5545 30.2667 95.0665 33.104 95.0665 36.176C95.0665 39.2907 94.5545 42.192 93.5305 44.88C92.5492 47.5253 91.0985 49.8293 89.1785 51.792C87.3012 53.712 85.0185 55.2267 82.3305 56.336C79.6425 57.4453 76.6345 58 73.3065 58ZM60.2505 35.856C60.2505 37.2213 60.3145 38.7147 60.4425 40.336C60.6132 41.9147 60.8905 43.4933 61.2745 45.072C61.6585 46.6507 62.1705 48.1867 62.8105 49.68C63.4505 51.1307 64.2612 52.432 65.2425 53.584C66.2665 54.6933 67.4398 55.5893 68.7625 56.272C70.1278 56.9547 71.7278 57.296 73.5625 57.296C76.2932 57.296 78.5118 56.5707 80.2185 55.12C81.9252 53.6693 83.2478 51.8773 84.1865 49.744C85.1678 47.6107 85.8292 45.3067 86.1705 42.832C86.5118 40.3147 86.6825 38.032 86.6825 35.984C86.6825 34.6187 86.5972 33.168 86.4265 31.632C86.2985 30.0533 86.0425 28.496 85.6585 26.96C85.2745 25.424 84.7625 23.952 84.1225 22.544C83.4825 21.0933 82.6718 19.8347 81.6905 18.768C80.7092 17.6587 79.5358 16.784 78.1705 16.144C76.8052 15.504 75.2265 15.184 73.4345 15.184C71.6425 15.184 70.0638 15.504 68.6985 16.144C67.3332 16.784 66.1598 17.6587 65.1785 18.768C64.2398 19.8347 63.4505 21.072 62.8105 22.48C62.1705 23.888 61.6585 25.36 61.2745 26.896C60.8905 28.432 60.6132 29.9893 60.4425 31.568C60.3145 33.104 60.2505 34.5333 60.2505 35.856ZM121.119 58C117.834 58 114.868 57.424 112.223 56.272C109.578 55.12 107.316 53.5413 105.439 51.536C103.604 49.5307 102.175 47.184 101.151 44.496C100.17 41.808 99.679 38.9067 99.679 35.792C99.679 32.8053 100.191 30.032 101.215 27.472C102.239 24.8693 103.69 22.608 105.567 20.688C107.444 18.768 109.706 17.2747 112.351 16.208C115.039 15.0987 118.026 14.544 121.311 14.544C124.639 14.544 127.626 15.0987 130.271 16.208C132.916 17.3173 135.178 18.8533 137.055 20.816C138.932 22.736 140.362 25.0187 141.343 27.664C142.367 30.2667 142.879 33.104 142.879 36.176C142.879 39.2907 142.367 42.192 141.343 44.88C140.362 47.5253 138.911 49.8293 136.991 51.792C135.114 53.712 132.831 55.2267 130.143 56.336C127.455 57.4453 124.447 58 121.119 58ZM108.063 35.856C108.063 37.2213 108.127 38.7147 108.255 40.336C108.426 41.9147 108.703 43.4933 109.087 45.072C109.471 46.6507 109.983 48.1867 110.623 49.68C111.263 51.1307 112.074 52.432 113.055 53.584C114.079 54.6933 115.252 55.5893 116.575 56.272C117.94 56.9547 119.54 57.296 121.375 57.296C124.106 57.296 126.324 56.5707 128.031 55.12C129.738 53.6693 131.06 51.8773 131.999 49.744C132.98 47.6107 133.642 45.3067 133.983 42.832C134.324 40.3147 134.495 38.032 134.495 35.984C134.495 34.6187 134.41 33.168 134.239 31.632C134.111 30.0533 133.855 28.496 133.471 26.96C133.087 25.424 132.575 23.952 131.935 22.544C131.295 21.0933 130.484 19.8347 129.503 18.768C128.522 17.6587 127.348 16.784 125.983 16.144C124.618 15.504 123.039 15.184 121.247 15.184C119.455 15.184 117.876 15.504 116.511 16.144C115.146 16.784 113.972 17.6587 112.991 18.768C112.052 19.8347 111.263 21.072 110.623 22.48C109.983 23.888 109.471 25.36 109.087 26.896C108.703 28.432 108.426 29.9893 108.255 31.568C108.127 33.104 108.063 34.5333 108.063 35.856ZM147.492 57.36C149.582 57.36 150.926 56.8267 151.524 55.76C152.164 54.6507 152.505 52.944 152.548 50.64V12.496C152.548 11.1733 152.526 10 152.484 8.976C152.484 7.952 152.356 7.09866 152.1 6.416C151.886 5.69066 151.502 5.136 150.948 4.752C150.393 4.368 149.582 4.13333 148.516 4.048V3.408C149.412 3.32266 150.393 3.19467 151.46 3.024C152.569 2.85333 153.657 2.64 154.724 2.384C155.833 2.128 156.921 1.85066 157.988 1.552C159.054 1.21066 160.014 0.847997 160.868 0.463997V40.144C161.38 38.2667 162.126 36.7093 163.108 35.472C164.132 34.192 165.262 33.0613 166.5 32.08C167.737 31.0987 169.038 30.2027 170.404 29.392C171.812 28.5813 173.156 27.7067 174.436 26.768C175.758 25.7867 176.974 24.6773 178.083 23.44C179.193 22.2027 180.11 20.6667 180.836 18.832C181.092 17.936 181.07 17.168 180.772 16.528C180.473 15.8453 179.726 15.376 178.532 15.12L178.596 14.544C179.748 14.6293 180.708 14.6933 181.476 14.736C182.286 14.7787 183.097 14.8 183.908 14.8C184.59 14.8 185.316 14.7787 186.084 14.736C186.894 14.6933 187.876 14.6293 189.028 14.544H189.22V15.12C187.982 15.248 186.937 15.44 186.084 15.696C185.273 15.952 184.569 16.3147 183.972 16.784C183.374 17.2107 182.798 17.808 182.244 18.576C181.732 19.3013 181.134 20.1973 180.451 21.264C179.598 22.8 178.596 24.1013 177.444 25.168C176.334 26.192 175.161 27.1307 173.924 27.984C172.686 28.8373 171.428 29.648 170.148 30.416C168.91 31.1413 167.737 31.952 166.628 32.848C167.609 32.6347 168.484 32.528 169.252 32.528C170.404 32.528 171.47 32.6987 172.452 33.04C173.476 33.3387 174.35 33.7227 175.076 34.192C176.27 34.9173 177.337 35.8773 178.276 37.072C179.214 38.2667 180.089 39.5893 180.9 41.04C181.71 42.448 182.5 43.9413 183.268 45.52C184.078 47.056 184.932 48.5707 185.828 50.064C186.724 51.5147 187.705 52.88 188.772 54.16C189.881 55.44 191.14 56.5067 192.548 57.36V58C191.268 57.9573 190.201 57.936 189.348 57.936C188.537 57.936 187.748 57.936 186.98 57.936C186.212 57.936 185.401 57.9573 184.548 58C183.737 58 182.692 58 181.412 58C180.772 56.8907 180.11 55.568 179.428 54.032C178.788 52.4533 178.126 50.8107 177.444 49.104C176.761 47.3547 176.057 45.6267 175.332 43.92C174.649 42.2133 173.945 40.656 173.22 39.248C172.494 37.7973 171.748 36.5813 170.98 35.6C170.254 34.6187 169.508 34 168.74 33.744C168.27 33.5733 167.801 33.488 167.332 33.488C166.436 33.488 165.582 33.8507 164.772 34.576C163.662 35.728 162.745 37.1147 162.02 38.736C161.337 40.3147 160.953 42.2987 160.868 44.688V51.024C160.91 53.2 161.252 54.8 161.892 55.824C162.574 56.848 163.918 57.36 165.924 57.36V58C162.724 57.872 159.609 57.808 156.58 57.808C153.593 57.808 150.564 57.872 147.492 58V57.36ZM223.867 45.392C223.867 43.3867 224.293 41.6587 225.147 40.208C226 38.7147 227.152 37.456 228.603 36.432C230.053 35.408 231.739 34.5973 233.659 34C235.579 33.36 237.605 32.848 239.739 32.464C237.776 32.08 236.155 31.376 234.875 30.352C233.637 29.328 232.763 28.1547 232.251 26.832C231.739 25.4667 231.568 24.08 231.739 22.672C231.952 21.2213 232.507 19.8987 233.403 18.704C234.299 17.4667 235.515 16.464 237.051 15.696C238.629 14.928 240.528 14.544 242.747 14.544C245.392 14.544 247.867 14.8 250.171 15.312C252.517 15.7813 254.587 16.5707 256.379 17.68C258.171 18.7893 259.621 20.2613 260.731 22.096C261.883 23.888 262.565 26.1067 262.779 28.752C262.864 29.4773 262.907 30.224 262.907 30.992C262.907 31.7173 262.907 32.464 262.907 33.232V45.328C262.907 46.864 262.907 48.3573 262.907 49.808C262.949 51.216 263.099 52.4747 263.355 53.584C263.611 54.6933 264.037 55.5893 264.635 56.272C265.232 56.9547 266.128 57.296 267.323 57.296V58C265.104 58 263.205 57.8293 261.627 57.488C260.048 57.1467 258.747 56.592 257.722 55.824C256.699 55.0133 255.931 53.9253 255.419 52.56C254.949 51.1947 254.715 49.488 254.715 47.44C253.52 50.8107 251.643 53.4133 249.083 55.248C246.523 57.0827 243.28 58.0213 239.355 58.064C234.277 58.1493 230.416 57.04 227.771 54.736C225.168 52.432 223.867 49.3173 223.867 45.392ZM232.123 45.968C232.123 49.2107 232.848 51.7707 234.299 53.648C235.749 55.4827 238.096 56.4 241.339 56.4C243.173 56.4 244.901 56.1227 246.523 55.568C248.187 54.9707 249.616 54.032 250.811 52.752C252.005 51.472 252.944 49.808 253.627 47.76C254.352 45.712 254.715 43.1947 254.715 40.208V32.272C253.392 32.272 251.92 32.2933 250.299 32.336C248.677 32.336 247.013 32.464 245.307 32.72C243.643 32.976 242.021 33.3813 240.443 33.936C238.864 34.4907 237.456 35.28 236.219 36.304C234.981 37.328 233.979 38.6293 233.211 40.208C232.485 41.7867 232.123 43.7067 232.123 45.968ZM232.379 24.08C232.421 25.0187 232.656 26 233.083 27.024C233.979 28.8587 235.28 30.16 236.987 30.928C238.736 31.696 240.592 32.08 242.555 32.08C244.347 31.8667 246.096 31.7387 247.803 31.696C249.509 31.6107 251.173 31.568 252.795 31.568H254.715C254.672 29.2213 254.437 27.0667 254.011 25.104C253.627 23.0987 252.965 21.392 252.027 19.984C251.088 18.5333 249.851 17.4027 248.315 16.592C246.821 15.7387 244.923 15.2907 242.619 15.248C241.296 15.248 240.016 15.44 238.779 15.824C237.541 16.1653 236.453 16.72 235.515 17.488C234.576 18.2133 233.808 19.1307 233.211 20.24C232.656 21.3493 232.379 22.6293 232.379 24.08ZM298.64 15.504C299.067 13.072 299.408 11.088 299.664 9.552C299.963 8.016 300.197 6.82133 300.368 5.968C300.539 5.072 300.645 4.45333 300.688 4.112C300.773 3.77066 300.816 3.57867 300.816 3.536H355.408V3.728L357.584 15.504C357.499 15.5467 357.435 15.568 357.392 15.568C357.392 15.568 357.349 15.5893 357.264 15.632C357.179 15.6747 357.115 15.696 357.072 15.696C355.707 13.6053 354.405 11.8347 353.168 10.384C351.931 8.89066 350.565 7.696 349.072 6.8C347.621 5.904 345.936 5.264 344.016 4.88C342.139 4.45333 339.856 4.24 337.168 4.24H332.112V50.704C332.155 52.9653 332.475 54.6507 333.072 55.76C333.712 56.8267 335.077 57.36 337.168 57.36V58C335.077 57.9147 333.349 57.8507 331.984 57.808C330.619 57.7227 329.317 57.68 328.08 57.68C326.843 57.6373 325.52 57.6587 324.112 57.744C322.747 57.7867 320.997 57.872 318.864 58V57.36C319.931 57.36 320.805 57.2107 321.488 56.912C322.171 56.6133 322.683 56.1653 323.024 55.568C323.365 54.9707 323.6 54.224 323.728 53.328C323.856 52.3893 323.92 51.3013 323.92 50.064V4.24H319.056C316.368 4.24 314.064 4.45333 312.144 4.88C310.267 5.264 308.581 5.904 307.088 6.8C305.637 7.696 304.272 8.89066 302.992 10.384C301.755 11.8347 300.475 13.6053 299.152 15.696C299.109 15.696 299.045 15.6747 298.96 15.632C298.875 15.5893 298.811 15.568 298.768 15.568C298.725 15.568 298.683 15.5467 298.64 15.504ZM341.679 45.392C341.679 43.3867 342.106 41.6587 342.959 40.208C343.812 38.7147 344.964 37.456 346.415 36.432C347.866 35.408 349.551 34.576 351.471 33.936C353.391 33.296 355.418 32.8053 357.551 32.464C355.588 32.08 353.967 31.376 352.687 30.352C351.45 29.2853 350.575 28.0907 350.063 26.768C349.551 25.4453 349.38 24.0587 349.551 22.608C349.764 21.1573 350.319 19.8347 351.215 18.64C352.111 17.4453 353.327 16.464 354.863 15.696C356.442 14.8853 358.34 14.48 360.559 14.48C363.204 14.48 365.679 14.736 367.983 15.248C370.33 15.7173 372.399 16.5067 374.191 17.616C375.983 18.7253 377.434 20.1973 378.543 22.032C379.695 23.824 380.378 26.0427 380.591 28.688C380.634 28.944 380.655 29.2213 380.655 29.52C380.655 29.776 380.676 30.0533 380.719 30.352C379.226 30.1387 377.775 30.0107 376.367 29.968C375.002 29.9253 373.7 29.904 372.463 29.904C372.335 27.7707 372.036 25.8293 371.567 24.08C371.14 22.288 370.458 20.752 369.519 19.472C368.58 18.1493 367.364 17.1253 365.871 16.4C364.378 15.632 362.564 15.2267 360.431 15.184C357.871 15.184 355.759 15.7387 354.095 16.848C352.474 17.9573 351.364 19.3227 350.767 20.944C350.255 22.224 350.084 23.5253 350.255 24.848C350.426 26.1707 350.916 27.3653 351.727 28.432C352.58 29.456 353.732 30.3093 355.183 30.992C356.634 31.6747 358.362 32.0373 360.367 32.08C362.116 31.8667 363.823 31.7387 365.487 31.696C367.194 31.6107 368.858 31.5467 370.479 31.504H370.863C375.13 31.504 379.396 31.8667 383.663 32.592C387.93 33.2747 391.962 34.6613 395.759 36.752V9.488C395.716 8.63466 395.631 7.888 395.503 7.248C395.418 6.56533 395.226 6.01066 394.927 5.584C394.628 5.11466 394.223 4.752 393.711 4.496C393.199 4.24 392.538 4.06933 391.727 3.984V3.344C392.623 3.25866 393.604 3.13066 394.671 2.96C395.78 2.78933 396.868 2.576 397.935 2.32C399.044 2.064 400.111 1.78666 401.135 1.488C402.202 1.14666 403.183 0.783998 404.079 0.399998V30.032C404.463 27.5573 405.167 25.36 406.191 23.44C407.215 21.52 408.431 19.8987 409.839 18.576C411.29 17.2533 412.911 16.2507 414.703 15.568C416.495 14.8427 418.351 14.48 420.271 14.48C423.386 14.48 426.116 15.0133 428.463 16.08C430.81 17.104 432.772 18.576 434.351 20.496C435.93 22.416 437.124 24.7413 437.935 27.472C438.746 30.16 439.151 33.168 439.151 36.496C439.151 39.8667 438.682 42.896 437.743 45.584C436.804 48.2293 435.482 50.4693 433.775 52.304C432.111 54.1387 430.127 55.5467 427.823 56.528C425.519 57.4667 423.023 57.936 420.335 57.936C418.671 57.9787 417.071 57.744 415.535 57.232C413.999 56.6773 412.57 55.9307 411.247 54.992C409.967 54.0533 408.815 52.944 407.791 51.664C406.767 50.384 405.935 48.976 405.295 47.44C404.228 45.136 402.778 43.1307 400.943 41.424C399.151 39.7173 397.146 38.288 394.927 37.136C392.751 35.9413 390.426 35.0027 387.951 34.32C385.519 33.6373 383.108 33.1253 380.719 32.784V45.264C380.719 46.8 380.719 48.2933 380.719 49.744C380.762 51.152 380.911 52.432 381.167 53.584C381.423 54.6933 381.85 55.5893 382.447 56.272C383.044 56.9547 383.94 57.296 385.135 57.296V57.936C382.916 57.936 381.018 57.7653 379.439 57.424C377.86 57.0827 376.559 56.528 375.535 55.76C374.511 54.9493 373.743 53.8827 373.231 52.56C372.762 51.1947 372.527 49.488 372.527 47.44C371.332 50.768 369.455 53.3493 366.895 55.184C364.335 57.0187 361.092 57.9573 357.167 58C354.65 58.0427 352.41 57.7867 350.447 57.232C348.527 56.6347 346.906 55.7813 345.583 54.672C344.303 53.5627 343.322 52.24 342.639 50.704C341.999 49.1253 341.679 47.3547 341.679 45.392ZM404.079 36.24C404.079 37.9893 404.164 39.7387 404.335 41.488C404.506 43.2373 404.954 44.9227 405.679 46.544C405.764 46.8427 405.892 47.1413 406.063 47.44L406.191 47.76C406.831 49.1253 407.642 50.4053 408.623 51.6C409.604 52.752 410.692 53.7547 411.887 54.608C413.124 55.4613 414.447 56.1227 415.855 56.592C417.306 57.0613 418.799 57.2747 420.335 57.232C422.298 57.232 423.962 56.6987 425.327 55.632C426.692 54.5653 427.78 53.1147 428.591 51.28C429.444 49.4027 430.042 47.2053 430.383 44.688C430.767 42.128 430.959 39.3973 430.959 36.496C430.959 34.192 430.831 31.7813 430.575 29.264C430.362 26.7467 429.871 24.4427 429.103 22.352C428.335 20.2613 427.247 18.5547 425.839 17.232C424.431 15.8667 422.575 15.184 420.271 15.184C418.65 15.184 417.071 15.44 415.535 15.952C414.042 16.464 412.634 17.232 411.311 18.256C409.988 19.28 408.815 20.5387 407.791 22.032C406.767 23.5253 405.978 25.232 405.423 27.152C405.167 27.8347 404.954 28.5813 404.783 29.392C404.612 30.2027 404.484 31.0133 404.399 31.824C404.314 32.6347 404.228 33.424 404.143 34.192C404.1 34.96 404.079 35.6427 404.079 36.24ZM349.935 45.904C349.935 49.1893 350.66 51.7493 352.111 53.584C353.562 55.4187 355.908 56.336 359.151 56.336C360.986 56.336 362.714 56.0587 364.335 55.504C365.999 54.9067 367.428 53.968 368.623 52.688C369.818 51.408 370.756 49.744 371.439 47.696C372.164 45.648 372.527 43.152 372.527 40.208V32.272C372.442 32.2293 372.335 32.208 372.207 32.208H371.951C370.628 32.1653 369.156 32.1867 367.535 32.272C365.914 32.3147 364.292 32.4853 362.671 32.784C361.05 33.04 359.471 33.4453 357.935 34C356.399 34.5547 355.034 35.344 353.839 36.368C352.644 37.392 351.684 38.6933 350.959 40.272C350.276 41.808 349.935 43.6853 349.935 45.904ZM391.407 57.296C392.303 57.296 393.028 57.104 393.583 56.72C394.18 56.2933 394.628 55.7387 394.927 55.056C395.226 54.3307 395.439 53.4987 395.567 52.56C395.695 51.6213 395.759 50.5973 395.759 49.488V39.632C397.466 40.656 399.023 41.8507 400.431 43.216C401.839 44.5813 403.055 46.2027 404.079 48.08V57.936H391.407V57.296ZM370.479 32.272L371.951 32.208C371.695 32.208 371.439 32.208 371.183 32.208C370.927 32.208 370.692 32.2293 370.479 32.272ZM452.958 57.744C451.422 57.744 449.886 57.7653 448.35 57.808C446.814 57.8507 445.278 57.9147 443.742 58V57.36C445.832 57.36 447.176 56.8267 447.774 55.76C448.414 54.6507 448.755 52.944 448.798 50.64V12.496C448.798 11.1733 448.776 10 448.734 8.976C448.734 7.952 448.606 7.09866 448.35 6.416C448.136 5.69066 447.752 5.136 447.198 4.752C446.643 4.368 445.832 4.13333 444.766 4.048V3.408C445.662 3.32266 446.643 3.19467 447.71 3.024C448.819 2.85333 449.907 2.64 450.974 2.384C452.083 2.128 453.171 1.85066 454.238 1.552C455.304 1.21066 456.264 0.847997 457.118 0.463997V51.024C457.16 53.2 457.502 54.8 458.142 55.824C458.824 56.848 460.168 57.36 462.174 57.36V58C460.638 57.9147 459.102 57.8507 457.566 57.808C456.03 57.7653 454.494 57.744 452.958 57.744ZM488.308 58.064C484.767 58.064 481.673 57.4453 479.028 56.208C476.383 54.9707 474.143 53.328 472.308 51.28C470.516 49.232 469.151 46.9067 468.212 44.304C467.316 41.7013 466.847 39.0347 466.804 36.304C466.804 33.5733 467.231 30.9067 468.084 28.304C468.98 25.7013 470.324 23.376 472.116 21.328C473.951 19.28 476.212 17.6373 478.9 16.4C481.631 15.1627 484.831 14.544 488.5 14.544C490.975 14.544 493.257 14.864 495.348 15.504C497.481 16.144 499.401 17.04 501.108 18.192C502.815 19.344 504.287 20.7307 505.524 22.352C506.761 23.9307 507.764 25.68 508.532 27.6C508.02 27.6853 507.231 27.8347 506.164 28.048C505.097 28.2187 503.839 28.432 502.388 28.688C500.98 28.944 499.401 29.2213 497.652 29.52C495.903 29.8187 494.089 30.1387 492.212 30.48C495.028 30.5227 497.439 30.9493 499.444 31.76C501.492 32.528 503.156 33.5307 504.436 34.768C505.759 35.9627 506.697 37.3493 507.252 38.928C507.849 40.464 508.084 42.0427 507.956 43.664C507.871 45.2427 507.444 46.8213 506.676 48.4C505.951 49.936 504.905 51.3013 503.54 52.496C501.62 54.2027 499.401 55.568 496.884 56.592C494.367 57.5733 491.508 58.064 488.308 58.064ZM475.38 33.488C475.209 36.0907 475.295 38.8 475.636 41.616C475.977 44.3893 476.66 46.9493 477.684 49.296C478.708 51.6 480.095 53.52 481.844 55.056C483.593 56.5493 485.812 57.3173 488.5 57.36C491.572 57.3173 494.303 56.8267 496.692 55.888C499.124 54.9067 501.257 53.6053 503.092 51.984C505.183 50.1067 506.505 47.9093 507.06 45.392C507.615 42.8747 507.337 40.4853 506.228 38.224C505.545 36.8587 504.692 35.728 503.668 34.832C502.644 33.936 501.492 33.232 500.212 32.72C498.975 32.1653 497.631 31.7813 496.18 31.568C494.729 31.3547 493.257 31.248 491.764 31.248C490.228 31.248 488.692 31.3333 487.156 31.504C485.663 31.6747 484.191 31.888 482.74 32.144C481.332 32.3573 479.988 32.592 478.708 32.848C477.471 33.104 476.361 33.3173 475.38 33.488ZM475.38 32.784C476.873 32.528 478.452 32.2507 480.116 31.952C481.823 31.6533 483.572 31.3333 485.364 30.992C488.137 30.5227 490.868 30.0533 493.556 29.584C496.287 29.072 498.761 28.624 500.98 28.24C500.639 26.576 500.148 24.976 499.508 23.44C498.911 21.8613 498.1 20.4747 497.076 19.28C496.095 18.0427 494.879 17.0613 493.428 16.336C492.02 15.6107 490.356 15.248 488.436 15.248C486.047 15.248 484.041 15.8027 482.42 16.912C480.841 17.9787 479.54 19.3653 478.516 21.072C477.535 22.7787 476.788 24.6773 476.276 26.768C475.807 28.816 475.508 30.8213 475.38 32.784Z" fill="#3A541C"/>
      </svg>
      <p className={` w-[50%] lt-sm:w-[90%] text-subblack mt-3 ${step >1 ? 'hidden':'block'} `}>
        Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim.
      </p>
      {step === 1 && <div>
        <div  className="btn flex justify-around cursor-pointer gap-10 items-center text-subblack mt-3">
          {(data.reserveDate === '') ?<div onClick={()=>{setShowProcess(true)}}>date </div>:<span onClick={()=>{setShowProcess(true)}}>{data.reserveDate}</span>}
          {(data.time === '') ? <div onClick={()=>{setShowProcess(true)}}>Time </div>:<span onClick={()=>{setShowProcess(true)}}>{data.time}</span>} 
          {(data.guests===0) ? <div onClick={()=>{setShowProcess(true)}}>Guests </div>:<span onClick={()=>{setShowProcess(true)}}>{data.guests}</span>}
          <button onClick={()=>{setStep(2)}} className={`btn-primary ${(data.reserveDate === '' || data.time === '' || data.guests === 0 )? 'bg-slate-400 hover:bg-slate-300 cursor-not-allowed opacity-30':''} `} disabled={data.reserveDate === '' || data.time === '' || data.guests === 0}>
            Book
          </button>
        </div>



        <div className='btn-secondary flex gap-4 items-center mt-3 justify-center cursor-pointer'>
          <p className='' onClick={downloadPdf}>Download Our Menu </p>
          <Download size={20} />
        </div>

      </div>}
      {
        step === 2 && 
        <div>
          <form className='mt-3 flex flex-col gap-3' onSubmit={(e)=>{handleSubmit(e)}}>
            <input id='firstname' type="text" placeholder='First Name' className='inputs-unique w-[30em]' />
            <input id='lastname' type="text" placeholder='Last Name' className='inputs-unique w-[30em]' />
            <input id='email' type="text" placeholder='Email' className='inputs-unique w-[30em]' />
            <input id='phone' type="text" placeholder='Phone' className='inputs-unique w-[30em]' />
            <textarea id='message'  placeholder='Special Request' className='inputs-unique w-[30em]' />
            <div className='flex w-[30em] gap-3 mt-1'>
              <button onClick={()=>{setStep(1)}} className='btn w-full mt-3'>Back</button>
              <button type='submit' className='btn-primary w-full mt-3'>Submit</button>

            </div>
          </form>
        </div>
      }
      {/* {
        step === 3 &&
        <div className='flex items-center flex-col gap-3'>
          <div className='flex gap-3 mt-5'>
            {roofs.map((roof: BaseRecord) => (
              <button
                className={` ${focusedRoof === roof.id ? 'btn-primary ' : 'btn-secondary'}`}
                key={roof.id}
                onClick={() => setFocusedRoof(roof.id)}
              >
                {roof.name}
              </button>
            ))}
          </div>
          <div className='relative h-[55vh] w-[80vw] lt-sm:overflow-x-auto shadow-2xl shadow-[#00000020] bg-white mb-3 rounded-[10px] '>
            {tables.filter((table: BaseRecord) => table.floor === floorId).map((table: BaseRecord) => (
                <button 
                onClick={()=>table.id !== undefined && handleTableClick(table.id)}
                disabled={table.id !== undefined && reservedTables.includes(table.id)}
                className='absolute p-2 '
                style={{
                  width: table.width,
                  height: table.height,
                  left: table.x,
                  top: table.y,
                  backgroundColor: table.id !== undefined && reservedTables.includes(table.id) ? '#FF4B4B' : '#F4F4F4',
                  borderRadius: table.type === 'RECTANGLE' ? '10px' : '50%',
                }}
                >
                  <h2 className='text-[14px] font-semibold'>{table.name}</h2>
                  <p className='text-[13px] p-1 bg-[#1e1e1e10] rounded-[5px]'>{table.max} seats</p>
                </button>
                
            ))}
          </div>

        </div>
      } */}
      {
        step === 4 &&
        <div className='flex flex-col items-center gap-3'>
          <button onClick={handleConfirmation} className='btn-primary mt-3'>Confirm your reservation</button>
        </div>
      }
      {
        step===5 &&
        <div>
          <p className='text-subblack mt-3'>
            Your reservation has been successfully made. You will receive a confirmation email shortly.
          </p>
          <button onClick={()=>{setStep(1)}} className='btn-primary mt-3'>Back</button>
        </div>
      }

      {showProcess && <div className=''><ReservationProcess noDarkMode={true} onClick={()=>{setShowProcess(false)}} getDateTime={(data:dataTypes)=>{setData(data)}}/></div>}
    </div>
  )
}

export default WidgetPage
