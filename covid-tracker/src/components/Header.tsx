import { AppBar, Toolbar, Typography } from '@mui/material'

interface HeaderProps {
    title: string
    description?: string
}

const Header = ({title, description}: HeaderProps) => {
  return (
      <AppBar
        position="absolute"
        color='primary'
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h3" color="inherit" noWrap>
            {title}
          </Typography>
          <Typography variant="subtitle1" color="inherit" sx={{pl: 3}} noWrap>
            {description}
          </Typography>
        </Toolbar>
      </AppBar>
  )
}

export default Header