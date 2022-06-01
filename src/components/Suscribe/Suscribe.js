import MailchimpSubscribe from "react-mailchimp-subscribe"

const Suscribe = () => {
    return (
        <MailchimpSubscribe url={process.env.REACT_APP_MAILCHIMP_URL} fields={[
            {
              name: 'EMAIL',
              placeholder: 'Ingresá tu email ...',
              type: 'email',
              required: true
            }
          ]} />
    )
}

export default Suscribe