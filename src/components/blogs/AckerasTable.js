import React from 'react'

export const DataTable = () => {
  return (
    <table border="1" className="dataframe">
      <thead>
        <tr style={{ textAlign: 'right' }}>
          <th />
          <th>Sales</th>
          <th>Quantity</th>
          <th>Discount</th>
          <th>Profit</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Ship Mode</th>
          <th>Category</th>
          <th>Country, France</th>
        </tr>
        <tr>
          <th>Order Date</th>
          <th />
          <th />
          <th />
          <th />
          <th />
          <th />
          <th />
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>2016-01-02</th>
          <td>1345.485</td>
          <td>5.0</td>
          <td>0.7</td>
          <td>-1031.5385</td>
          <td>41.893320</td>
          <td>12.482932</td>
          <td>3.0</td>
          <td>1</td>
          <td>0.0</td>
        </tr>
        <tr>
          <th>2016-01-02</th>
          <td>11.784</td>
          <td>3.0</td>
          <td>0.2</td>
          <td>3.9771</td>
          <td>40.835934</td>
          <td>14.248783</td>
          <td>3.0</td>
          <td>1</td>
          <td>0.0</td>
        </tr>
        <tr>
          <th>2016-01-02</th>
          <td>43.960</td>
          <td>2.0</td>
          <td>0.0</td>
          <td>20.6612</td>
          <td>41.893320</td>
          <td>12.482932</td>
          <td>0.0</td>
          <td>1</td>
          <td>0.0</td>
        </tr>
        <tr>
          <th>2016-01-02</th>
          <td>32.232</td>
          <td>3.0</td>
          <td>0.2</td>
          <td>2.4174</td>
          <td>38.111227</td>
          <td>13.352443</td>
          <td>3.0</td>
          <td>1</td>
          <td>0.0</td>
        </tr>
        <tr>
          <th>2016-01-02</th>
          <td>3.136</td>
          <td>2.0</td>
          <td>0.8</td>
          <td>-4.7040</td>
          <td>43.769871</td>
          <td>11.255576</td>
          <td>3.0</td>
          <td>1</td>
          <td>0.0</td>
        </tr>
      </tbody>
    </table>
  )
}
