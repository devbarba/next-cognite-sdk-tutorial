import type { NextPage } from 'next'
import Head from 'next/head'
import ButtonUnstyled from '@mui/core/ButtonUnstyled';
import { useEffect, useState } from 'react'
import { Asset } from '@cognite/sdk';
import { useAuth } from '../contexts/AuthContext';
import CogPage from '../components/templates/CogPage';
import CogRoundedContainer from '../components/atoms/CogRoundedContainer';
import CogHeaderFull from '../components/atoms/CogHeaderFull';
import CogTable from '../components/molecules/CogTable';
import { useRoot } from '../contexts/RootContext';
import { useRouter } from 'next/router';
import { useFilters } from '../contexts/FilterContext';
import CogDate from '../components/molecules/CogDate';

const Time: NextPage = () => {
   
    const router = useRouter();
    const [assets, setAssets] = useState<Asset[]>({} as Asset[]);
   
    return (
        <>
            <Head>
                <title>Cognite Search - Time Series</title>
            </Head>

                        <CogPage>
                            <CogHeaderFull label={'Time Series'} icon={'fas fa-clock'}>{}</CogHeaderFull>
                            <CogRoundedContainer>
                                <h2>
                                    <div style={{ textAlign: 'left', marginBottom: 20 }}>
                                        <p>{`${assets.length > 0 ? assets.length : 0} Assets`}</p>
                                    </div>
                                </h2>
                
                                <CogDate />
                               
                            </CogRoundedContainer>
                            
                        </CogPage>
            
            
        </>
    )
}

export default Time
