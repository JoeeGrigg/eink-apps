import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const backupKey = 'backup';
const storageKey = 'config';

export type BackupConfig = {
    host: string | null
    encryptionKey: string | null
}

export type TotpItemConfig = {
    uuid: string,
    name: string,
    secret: string
}

export type StorageConfig = {
    totps: Record<string, TotpItemConfig>
}

export const defaultConfig: StorageConfig = {
    totps: {}
}

export const defaultBackupConfig: BackupConfig = {
    host: null,
    encryptionKey: null
}

export async function getBackupConfig(): Promise<BackupConfig> {
    try {
        const jsonValue = await AsyncStorage.getItem(backupKey);
        return jsonValue == null ? setBackupConfig(defaultBackupConfig) : JSON.parse(jsonValue);
    } catch (e) {
        console.log(e);
        return Promise.reject(e);
    }
}

export async function setBackupConfig(value: BackupConfig): Promise<BackupConfig> {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(backupKey, jsonValue);
        return value;
    } catch (e) {
        console.log(e);
        return Promise.reject(e);
    }
}

export async function getConfig(): Promise<StorageConfig> {
    try {
        const jsonValue = await AsyncStorage.getItem(storageKey);
        return jsonValue == null ? setConfig(defaultConfig) : JSON.parse(jsonValue);
    } catch (e) {
        console.log(e);
        return Promise.reject(e);
    }
}

export async function setConfig(value: StorageConfig): Promise<StorageConfig> {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(storageKey, jsonValue);
        return value;
    } catch (e) {
        console.log(e);
        return Promise.reject(e);
    }
}

export function newTotpItem(name: TotpItemConfig['name'] = '', secret: TotpItemConfig['secret'] = ''): TotpItemConfig {
    return {
        uuid: uuidv4(),
        name: name,
        secret: secret
    };
}

export async function addTotp(name: TotpItemConfig['name'], secret: TotpItemConfig['secret']): Promise<TotpItemConfig> {
    const newItem = newTotpItem(name, secret);
    let config = await getConfig();
    config.totps[newItem.uuid] = newItem;
    await setConfig(config);
    return newItem;
}

export async function deleteTotp(uuid: TotpItemConfig['uuid']): Promise<void> {
    let config = await getConfig();
    delete config.totps[uuid];
    await setConfig(config);
}