declare module 'qrcode' {
    interface QRCodeOptions {
        errorCorrectionLevel?: 'low' | 'medium' | 'quartile' | 'high';
    }

    const QRCode: {
        toDataURL(value: string, options?: QRCodeOptions): Promise<string>;
    };

    export default QRCode;
}