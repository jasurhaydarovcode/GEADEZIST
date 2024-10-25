type Method =
  | 'get'
  | 'post'
  | 'put'
  | 'delete'
  | 'patch'
  | 'options'
  | 'head';
export interface AxiosRequestConfig {
    url?: string; // So'rov URL manzili
    method?: Method; // So'rov metodi (GET, POST, va hokazo)
    headers?: Record<string, any>; // So'rov sarlavhalari
    params?: Record<string, any>; // So'rov parametrlarini ko'rsatadi
    data?: any; // So'rovga yuboriladigan ma'lumotlar
    timeout?: number; // So'rov uchun kutish vaqti
    responseType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'; // Javob turini belgilaydi
    // Qo'shimcha parametrlar
    [key: string]: any; // Qo'shimcha dinamik xususiyatlar
}

export interface AxiosResponse<T = any> {
    data: T; // Javob ma'lumotlari
    status: number; // HTTP status kodi
    statusText: string; // HTTP status xabari
    headers: Record<string, any>; // Javob sarlavhalari
    config: AxiosRequestConfig; // So'rov konfiguratsiyasi
    request?: any; // So'rov obyekti (ixtiyoriy)
  }
  

export interface AxiosError<T = any> extends Error {
    config: AxiosRequestConfig; // So'rov konfiguratsiyasi
    code?: string; // Xato kodi (bo'sh bo'lishi mumkin)
    request?: any; // So'rov obyekti
    response?: AxiosResponse<T>; // Javob obyekti
    isAxiosError: true; // Bu xato AxiosError ekanligini ko'rsatadi
}