import Slide from './Slide'
import {
    infoData,
    importantData,
} from '../../assets/js/DataStorage/SliderData'
import { useState, useEffect } from 'react';
import UserService from '../../services/UserService';

export default function Slider ({ children }) {
    const [servicesData, setServicesData] = useState([]);
    const [importantsData, setImportantsData] = useState([]);

    
    useEffect(() => {

        const fetchServicesData = async () => {
            try {
                const response = await UserService.getServices()

                setServicesData(response.data);
            } catch (error) {
                console.error('Error fetching services data:', error);
            }
        };

        const fetchImportantsData = async () => {
            try {
                const response = await UserService.getImportants()

                setImportantsData(response.data);
            } catch (error) {
                console.error('Error fetching services data:', error);
            }
        };
        fetchServicesData();
        fetchImportantsData();
    }, []);

    switch (children) {
        case 'Services':
            return <Slide data={servicesData} />
        case 'InfoImages':
            return <Slide data={infoData} />
        case 'Important':
            return <Slide data={importantsData} />
        default: 
            return <Slide data={servicesData} />
    }
}
