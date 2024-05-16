import React from 'react';

const ReportOfSales = ({data}) => {

  return (
    <div>
      <div className='sales-label'>
        Sales
      </div>
      <div className='sales-report-display'>
        <div className='sales-report-entry'>
          <span>
            총 세일즈(평균)
          </span>
          <span>
            ${data.total_sales} ({data.average_sales})
          </span>
        </div>
        <div className='sales-report-entry'>
          <span>
            총 팁(평균)
          </span>
          <span>
            ${data.total_tip} ({data.average_tip})
          </span>
        </div>
        <div className='sales-report-entry'>
          <span>
            총 Cash
          </span>
          <span>
            {Number(data.total_cash_sales) + Number(data.total_cash_tip)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ReportOfSales;