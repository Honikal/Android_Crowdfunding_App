import axios from 'axios';
import { SENDGRID_API_KEY, FROM_EMAIL } from '@env';

class EmailSender {
    constructor() {
        this.apiKey = SENDGRID_API_KEY;
        this.fromEmail = FROM_EMAIL;
        this.apiUrl = 'https://api.sendgrid.com/v3/mail/send';
    }

    //Función privada para estructurar los datos del correo
    _createEmailData(toEmail, subject, body){
        return {
            personalizations: [{
                to: [{ email: toEmail }],
                subject: subject,
            }],
            from: { email: this.fromEmail },
            content: [{
                type: 'text/plain',
                value: body,
            }]
        }
    }

    //Método para enviar el correo
    async sendEmail(toEmail, subject, body){
        console.log('API KEY: ', this.apiKey);
        console.log('FROM EMAIL: ', this.fromEmail);

        const emailData = this._createEmailData(toEmail, subject, body);

        try {
            const response = await axios.post(this.apiUrl, emailData, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log('Correo enviado de forma exitosa: ', response.data);
        } catch (error) {
            console.error('Error desde capa entidad de base de envío de correos');
            if (error.response){
                console.error('Estado del error: ', error.response.status);
                console.error('Detalles del error: ', error.response.data);
            } else if (error.request) {
                console.error("No respuesta recibida: ", error.request);
            } else {
                console.error('Error:', error.message);
            }

        }
    }
}

export default EmailSender;