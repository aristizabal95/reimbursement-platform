import React from 'react'
import Reimbursment from '../components/reimbursments/Reimbursment'

const HomePage = () => {
    
    const info = {event_name: 'Nerdapalooza', date: '2024-01-01', status: 'draft', total_amount: 200, currency: 'USD'};

    return <Reimbursment info={info}></Reimbursment>
}

export default HomePage
