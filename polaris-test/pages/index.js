import Head from 'next/head';
//import {AppProvider, Page, Card, Button, useIndexResourceState, IndexTable} from '@shopify/polaris';
import {AppProvider, Page, Card, IndexTable, useIndexResourceState, TextStyle, Button } from  '@shopify/polaris';

export default function Home() {
  const customers = [
    {
      id: '344',
      rating: '3',
      url: 'customers/341',
      name: 'Mae Jemison',
      created: '20 June, 2020',
      phone: '+91 9999999999',
      review: 'This is a review',
    },
    {
      id: '123',
      rating: '4',
      url: 'customers/256',
      name: 'Ellen Ochoa',
      created: '20 June, 2020',
      phone: '+91 9999999999',
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
      onAction: () => console.log('Todo: implement bulk edit'),
    },
    {
      content: 'Reject Selected',
      onAction: () => console.log('Todo: implement bulk edit'),
    },
  ];
  const bulkActions = [
    {
      content: 'Add tags',
      onAction: () => console.log(selectedResources),
    },
    {
      content: 'Remove tags',
      onAction: () => console.log('Todo: implement bulk remove tags'),
    },
    {
      content: 'Delete customers',
      onAction: () => console.log('Todo: implement bulk delete'),
    },
  ];

  const rowMarkup = customers.map(
    ({id,rating, name, created, phone, review}, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>{rating}</IndexTable.Cell>
        <IndexTable.Cell>
          <TextStyle variation="strong">{name}</TextStyle><br />
          <Button onClick={() => {console.log({name})}}> Approve</Button>
        </IndexTable.Cell>
        <IndexTable.Cell>{created}</IndexTable.Cell>
        <IndexTable.Cell>{phone}</IndexTable.Cell>
        <IndexTable.Cell>{review}</IndexTable.Cell>
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
                  {title: 'Name'},
                  {title: 'Created'},
                  {title: 'Phone'},
                  {title: 'Review'},
                  
                ]}
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
