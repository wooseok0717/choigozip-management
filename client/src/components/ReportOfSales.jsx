import React from 'react';

const ReportOfSales = ({data}) => {

  console.log(data)

  return (
    <div>
      <div className='sales-label'>
        Sales
      </div>
      <div className='sales-report-display'>
        <div className='sales-report-entry'>
          <span>
            평균 세일즈
          </span>
          <span>
            ${data.average_sales}
          </span>
        </div>
        <div className='sales-report-entry'>
          <span>
            총 세일즈
          </span>
          <span>
            ${data.total_sales}
          </span>
        </div>
        <div className='sales-report-entry'>
          <span>
            평균 팁
          </span>
          <span>
            ${data.average_tip}
          </span>
        </div>
        <div className='sales-report-entry'>
          <span>
            총 팁
          </span>
          <span>
            ${data.total_tip}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ReportOfSales;