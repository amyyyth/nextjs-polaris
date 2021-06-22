import Head from 'next/head';
import {AppProvider, Page,Icon,  Banner,TextContainer, ExceptionList, Checkbox, Card, IndexTable, useIndexResourceState, TextStyle, Button } from  '@shopify/polaris';
import {
  TickMinor, EditMinor
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
  function handleEdit(selectedId){
    console.log('Edit: '+selectedId)
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
    {
      id: '145',
      rating: '3',
      url: 'customers/145',
      name: 'Sherlock Holmes',
      created: '9 June, 2020',
      phone: '+91 9999999999',
      status: 'Approved',
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
      <Card style={{width: "100%",}}>
        
        <div style={{display: 'grid', gridTemplateColumns: '5% 7% 15% 15% 17% 13% 23%', width: '100%'}}>

          <div style={{margin: '10px'}}>
            <Checkbox
              checked={selectedResources.includes(id)}
              onChange={() => {handleSelectionChange('single',!(selectedResources.includes(id)),id)}}
              id={id}
            />
          </div>
          
          <div style={{margin: '10px'}}>
            <p>{rating}</p>
          </div>
          <div style={{margin: '10px'}}>
            <p>{name}</p>
          </div>
          <div style={{margin: '10px'}}>
            <p>{created}</p>
          </div>
          <div style={{margin: '10px'}}>
            <p>{phone}</p>
          </div>
          <div style={{margin: '10px'}}>
            <p>{status === 'Approved'? <span style={{backgroundColor: "#f3c583", borderRadius: '100px', padding: '5px 10px 5px 10px'}}>{status}</span>: 
                status === 'Published'? <span style={{backgroundColor: "#bbe5b3", borderRadius: '100px', padding: '5px 10px 5px 10px'}}>{status}</span>:
                <span style={{backgroundColor: "#aedcf3", borderRadius: '100px', padding: '5px 10px 5px 10px'}}>{status}</span>
           }
            </p>
          </div>
          <div style={{margin: '10px'}}>
            <p>{review}</p>
          </div>
        </div>
        <div style={{padding: "20px", position: 'relative', left: '0', bottom: '0'}}>
        {status === 'Approved'?
          <>
                       
            <div style={{display: 'flex', width: '20%'}}>
            <div style={{display: 'flex'}}>
            <Icon
              source={TickMinor}
              color="subdued" margin="none" />
            <span style={{marginRight: "20px"}}><TextStyle variation='subdued'>Approved</TextStyle></span>
            </div>
            <div style={{display: 'flex'}}>
              
              <Icon
                source={EditMinor}
                color='primary' />
                <a onClick={() => {handleEdit(id)}} style={{textDecoration: 'none', cursor: 'pointer'}}>
              <TextStyle variation='positive'>Edit</TextStyle>
              </a>
            </div>
            </div>
          </>
        :
        <>
          <div style={{display: 'flex', width: '20%', alignItems: 'end', justifyContent: 'middle'}}>
            <div style={{display: 'flex', alignItems: 'end', justifyContent: 'middle'}}>
            <button
            onClick={() => {console.log('Approve: '+ String(id))}}
            style={{
              backgroundColor: '#2575cf',
              padding: '5px 10px 5px 10px',
              borderRadius: '3px',
              outline: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              marginRight: '20px'
            }}
            >
            Approve
          </button>
            </div>
            <div style={{display: 'flex'}}>
              <Icon
                source={EditMinor}
                color='primary' />
              <a onClick={() => {handleEdit(id)}} style={{textDecoration: 'none', cursor: 'pointer'}}>
                <TextStyle variation='positive'>Edit</TextStyle>
              </a>
            </div>
            </div>
          
        </>
        }
        </div>
      </Card>
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
                itemCount={customers.length}
                selectedItemsCount={
                  allResourcesSelected ? 'All' : selectedResources.length
                }
                onSelectionChange={handleSelectionChange}
                bulkActions={bulkActions}
                promotedBulkActions={promotedBulkActions}
                headings={[
                  {}
                  
                ]}
              >
                
               
              </IndexTable>
            </Card>
            <div style={{display: 'grid', gridTemplateColumns: '5% 7% 15% 15% 17% 13% 23%', width: '100%'}}>
            <div style={{margin: '10px'}}>
              <a style={{color: '#6e7276', cursor: 'pointer', textDecoration: 'underline'}} onClick={() => {handleSelectionChange('page',true,customers.id)}}>All</a>
            </div>
            <div style={{margin: '10px'}}>
              <TextStyle variation='subdued'>Rating</TextStyle>
            </div>
            <div style={{margin: '10px'}}>
              <p></p>
              <TextStyle variation='subdued'>Name</TextStyle>
            </div>
            <div style={{margin: '10px'}}>
            <TextStyle variation='subdued'>Created</TextStyle>
            </div>
            <div style={{margin: '10px'}}>
              <TextStyle variation='subdued'>Phone</TextStyle>
            </div>
            <div style={{margin: '10px'}}>
              <TextStyle variation='subdued'>Status</TextStyle>
            </div>
            <div style={{margin: '10px'}}>
              <TextStyle variation='subdued'>Review</TextStyle>
            </div>
            </div>
              {rowMarkup}
            
          </Page>
        </AppProvider>
       
      </main>
    </div>
  )
}
