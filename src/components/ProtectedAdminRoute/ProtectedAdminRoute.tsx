import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserRoleFetcherProps } from '../../types';

const ProtectedAdminRoute: React.FC<UserRoleFetcherProps> = ({ auth, db, children }) => {
    const [user] = useAuthState(auth);
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserRole = async () => {
            if (user) {
                try {
                    const roleDocRef = doc(db, 'roles', user.uid);
                    const roleDoc = await getDoc(roleDocRef);
                    const roleData = roleDoc.data();

                    if (roleData && roleData.role) {
                        setRole(roleData.role || 'user');
                    }
                } catch (error) {
                    console.error('Error fetching user role:', error);
                }
            }
        };

        fetchUserRole();
    }, [user, db]);

    return children(role);
};

export default ProtectedAdminRoute;
