import {Card,CardContent,Typography} from '@material-ui/core'

const Share = ({share}) => {
    return (
        <>
            <Card style={{margin:'20px'}}>
                <CardContent>
                    <Typography>
                        stock:{share.stockName}
                    </Typography>
                    <Typography>
                       units: {share.stockQuantity}
                    </Typography>
                    <Typography>
                       price: {share.price}$
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default Share
