// pages/login.tsx

const onSuccess = (res) => {
    console.log('[Login Success] currentUser:', res.profileObj);
    router.push('/game');
  };
  