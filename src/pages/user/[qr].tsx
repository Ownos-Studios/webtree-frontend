import React, { useEffect } from 'react'
import { useRouter } from 'next/router';

import QRCode from "react-qr-code";
interface QRCodeProps {

}

const QrCode: React.FC<QRCodeProps> = ({}) => {
    const router = useRouter();
    const [qr, setQr] = React.useState<string>('')
    useEffect(() => {
        if (router.isReady) {
            const { code } = router.query;
            setQr(code as string)
        }
    }, [router.isReady, router.query])
  
    

        return (
            <>
            <h1 className='text-2xl text-center mt-12'>
            Please scan this QR using your mobile (reclaim app)
        </h1>
            <div className='mx-auto
            flex justify-center align-center mt-12
            '>
               
            <QRCode value={qr} />

         
            </div>
            <h1 className='text-lg text-center mt-12'>
                You can close this window once you have scanned the qr
            </h1>
            </>

        );
}

export default QrCode