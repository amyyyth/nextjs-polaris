import Head from 'next/head';
import {AppProvider, Page,Icon, Banner,TextContainer, ExceptionList, Card, IndexTable, useIndexResourceState, TextStyle, Button } from  '@shopify/polaris';
import {
  TickMinor
} from '@shopify/polaris-icons';

export default function Home() {
  function handleApprove(selectedIds){
    console.log('Approve: '+selectedIds.join());
  }
  function handleReject(selectedIds){
    console.log('Reject: '+selectedIds.join());
  }
  function handleDelete(selectedIds){
    console.log('Delete: '+selectedIds.join());
  }
  const customers = [
    {
      id: '344',
      rating: '3',
      url: 'customers/344',
      name: 'Mae Jemison',
      created: '20 June, 2020',
      phone: '+91 9999999999',
      status: 'Approved',
      review: 'This is a review This is a review This is a review This is a review This is a review This is a review This is a review This is a review This is a review This is a review This is a review ',
    },
    {
      id: '123',
      rating: '4',
      url: 'customers/123',
      name: 'Ellen Ochoa',
      created: '24 June, 2020',
      phone: '+91 9999999999',
      status: 'Exported',
      review: 'This is a review',
    },
    {
      id: '355',
      rating: '5',
      url: 'customers/355',
      name: 'John Watson',
      created: '31 June, 2020',
      phone: '+91 9999999999',
      status: 'Published',
      review: 'This is a review',
    },
  ];
  const resourceName = {
    singular: 'customer',
    plural: 'customers',
  };

  const {
    selectedResources,
    allResourcesSelected,
    handleSelectionChange,
  } = useIndexResourceState(customers);

  const promotedBulkActions = [
    {
      content: 'Approve Selected',
      onAction: () => handleApprove(selectedResources),
    },
    {
      content: 'Reject Selected',
      onAction: () => handleReject(selectedResources),
    },
  ];
  const bulkActions = [
    
    {
      content: 'Delete',
      onAction: () => handleDelete(selectedResources),
    },
  ];

  const rowMarkup = customers.map(
    ({id,rating, name, created, phone, review, status}, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>{rating}
        {status === 'Approved'?
          <ExceptionList
          items={[
            {
              icon: TickMinor ,
              description: 'Approved',
            },
          ]}
        />
        :
        <>
          <br/>
          <button
           onClick={() => {console.log('Approve: '+ String(id))}}
           style={{
             backgroundColor: '#2575cf',
             padding: '5px 10px 5px 10px',
             borderRadius: '3px',
             outline: 'none',
             border: 'none',
             color: 'white',
             cursor: 'pointer'
           }}
           >
            Approve
          </button>
        </>
        }
        
        </IndexTable.Cell>
        
        <IndexTable.Cell>{created}</IndexTable.Cell>
        <IndexTable.Cell>{phone}</IndexTable.Cell>
        <IndexTable.Cell>
          {status === 'Approved'? <span style={{backgroundColor: "#f3c583", borderRadius: '100px', padding: '5px 10px 5px 10px'}}>{status}</span>: 
          status === 'Published'? <span style={{backgroundColor: "#bbe5b3", borderRadius: '100px', padding: '5px 10px 5px 10px'}}>{status}</span>:
          <span style={{backgroundColor: "#aedcf3", borderRadius: '100px', padding: '5px 10px 5px 10px'}}>{status}</span>
          }
        </IndexTable.Cell>
        <IndexTable.Cell> <TextStyle variation="strong">{name}</TextStyle> wrote a review:<br/><TextContainer>{review}</TextContainer></IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <div className="container">
      <Head>
        <title>Trying out polaris</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/@shopify/polaris@6.5.0/dist/styles.css"
        />

      </Head>

      <main>
        
        <AppProvider>
          <Page>
            <Card>
              <IndexTable
                resourceName={resourceName}
                totals={['', '', '', 255, '$155,830.00']}
                itemCount={customers.length}
                selectedItemsCount={
                  allResourcesSelected ? 'All' : selectedResources.length
                }
                onSelectionChange={handleSelectionChange}
                bulkActions={bulkActions}
                promotedBulkActions={promotedBulkActions}
                headings={[
                  {title: 'Rating'},
                  {title: 'Created'},
                  {title: 'Phone'},
                  {title: 'Status'},
                  {title: 'Review'},
                  
                ]}
                //hasMoreItems={true}
              >
                
                {rowMarkup}
              </IndexTable>

            </Card>
            <p>{selectedResources.join()}</p>
          </Page>
        
         
        </AppProvider>
       
      </main>
    </div>
  )
}
