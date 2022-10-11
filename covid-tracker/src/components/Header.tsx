import { AppBar, Toolbar, Typography } from '@mui/material'

interface HeaderProps {
    title: string
    description?: string
}

const Header = (props: HeaderProps) => {
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
            {props.title}
          </Typography>
          <Typography variant="subtitle1" color="inherit" sx={{pl: 3}} noWrap>
            {props.description}
          </Typography>
        </Toolbar>
      </AppBar>
  )
}

export default Header