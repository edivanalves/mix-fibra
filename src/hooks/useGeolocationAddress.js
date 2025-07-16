import { useState } from 'react';
import { toast } from 'react-hot-toast';

export const useGeolocationAddress = () => {
    const [address, setAddress] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [accuracy, setAccuracy] = useState(null);

    const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/reverse?format=json&zoom=18&addressdetails=1';
    const CACHE_KEY = 'mixfibra-location-cache';
    const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

    const getCachedLocation = () => {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_DURATION) {
                return data;
            }
        }
        return null;
    };

    const setCachedLocation = (data) => {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
            data,
            timestamp: Date.now()
        }));
    };

    const fetchAddressByCoords = async (latitude, longitude, accuracy) => {
        setIsLoading(true);
        setAccuracy(accuracy);
        
        // Check cache first
        const cached = getCachedLocation();
        if (cached && cached.coords && 
            Math.abs(cached.coords.lat - latitude) < 0.001 && 
            Math.abs(cached.coords.lng - longitude) < 0.001) {
            setAddress(cached.address);
            setIsLoading(false);
            toast.success('📍 Localização carregada do cache!');
            return;
        }

        toast.loading(`🛰️ Localizando... (precisão: ${Math.round(accuracy)}m)`);

        try {
            const response = await fetch(`${NOMINATIM_URL}&lat=${latitude}&lon=${longitude}`, {
                headers: { 'User-Agent': 'MixFibra/1.0 (contato@mixfibra.com.br)' }
            });
            const data = await response.json();

            if (data && data.address) {
                const addressData = {
                    ...data.address,
                    postcode: data.address.postcode?.replace('-', ''),
                    road: data.address.road || data.address.pedestrian,
                    suburb: data.address.suburb || data.address.neighbourhood,
                    city: data.address.city || data.address.town || data.address.village,
                    state_code: data.address.state?.substring(0, 2).toUpperCase() || 'PB'
                };
                
                setAddress(addressData);
                toast.dismiss();
                toast.success(`📍 Endereço encontrado! (${Math.round(accuracy)}m de precisão)`);
            } else {
                toast.dismiss();
                toast.error('❌ Não foi possível encontrar um endereço detalhado.');
            }
        } catch (apiError) {
            console.error("Erro na API Nominatim: ", apiError);
            toast.dismiss();
            toast.error('❌ Erro ao buscar endereço. Tente preencher manualmente.');
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
        toast.loading('🔍 Obtendo sua localização...', { duration: 15000 });

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude, accuracy } = position.coords;
                fetchAddressByCoords(latitude, longitude, accuracy);
            },
            (error) => {
                setIsLoading(false);
                toast.dismiss();
                let errorMessage = '❌ Erro desconhecido ao obter localização.';
                let suggestion = '';
                
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = '🚫 Permissão de localização negada.';
                        suggestion = 'Permita o acesso à localização nas configurações do navegador.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = '📡 Localização indisponível.';
                        suggestion = 'Verifique se o GPS está ativado e tente novamente.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = '⏱️ Tempo esgotado para obter localização.';
                        suggestion = 'Tente novamente em um local com melhor sinal.';
                        break;
                }
                
                toast.error(`${errorMessage} ${suggestion}`, { duration: 6000 });
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 300000 }
        );
    };

    return { address, isLoading, getUserLocation };
};