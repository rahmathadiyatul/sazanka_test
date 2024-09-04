import * as React from 'react';
import './../App.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const CardBody = () => {
  return (
    <div className="card-body">
        <Card sx={{ maxWidth: '40%', minWidth: 275, backgroundColor:'none' }}>
            <CardContent>
                <Typography variant="h6">
                Aplikasi ini akan mencari pasangan dari sekelompok bilangan di mana jumlah dari setiap pasangan angka tersebut sama dengan target yang telah ditentukan.
                <br/>Silakan klik tombol dibawah untuk memulai aplikasi.                <br />
                </Typography>
            </CardContent>
        </Card>
    </div>
  );
}

export default CardBody;
