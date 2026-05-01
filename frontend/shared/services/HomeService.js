import homeProvider from '../providers/HomeProvider.js';

class HomeService {
    constructor() {
        this.dashboardData = null;
        this.areas = [];
    }

    async loadDashboardData() {
        try {
            this.dashboardData = await homeProvider.getDashboardData();
            return this.dashboardData;
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
            throw error;
        }
    }

    async loadAreas() {
        try {
            this.areas = await homeProvider.getAreas();
            return this.areas;
        } catch (error) {
            console.error('Failed to load areas:', error);
            throw error;
        }
    }

    getDashboardData() {
        return this.dashboardData;
    }

    getAreas() {
        return this.areas;
    }
}

export default new HomeService();
