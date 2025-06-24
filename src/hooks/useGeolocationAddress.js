import { useState } from 'react';
import { toast } from 'react-hot-toast';

export const useGeolocationAddress = () => {
    const [address, setAddress] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/reverse?format=json&zoom=18&addressdetails=1';

    const fetchAddressByCoords = async (latitude, longitude) => {
        setIsLoading(true);
        toast.loading('Buscando endereço...');

        try {
            const response = await fetch(`${NOMINATIM_URL}&lat=${latitude}&lon=${longitude}`, {
                headers: { 'User-Agent': 'MixFibra/1.0 (seuemail@provedor.com)' }
            });
            const data = await response.json();

            if (data && data.address) {
                setAddress(data.address);
                toast.dismiss();
                toast.success('Endereço preenchido!');
            } else {
                toast.dismiss();
                toast.error('Não foi possível encontrar um endereço detalhado.');
            }
        } catch (apiError) {
            console.error("Erro na API Nominatim: ", apiError);
            toast.dismiss();
            toast.error('Erro ao buscar endereço. Tente preencher manualmente.');
        } finally {
            setIsLoading(false);
        }
    };

    const getUserLocation = () => {
        if (!navigator.geolocation) {
            toast.error('Geolocalização não é suportada por este navegador.');
            return;
        }

        setIsLoading(true);
        toast.loading('Obtendo sua localização...');

        navigator.geolocation.getCurrentPosition(
            (position) => {
                fetchAddressByCoords(position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                setIsLoading(false);
                toast.dismiss();
                let errorMessage = 'Ocorreu um erro desconhecido.';
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Permissão de localização negada.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Informação de localização indisponível.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Tempo esgotado para obter a localização.';
                        break;
                }
                toast.error(errorMessage);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    return { address, isLoading, getUserLocation };
};